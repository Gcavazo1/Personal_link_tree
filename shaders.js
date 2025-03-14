// Shader implementation using Three.js for GLSL
let renderer, scene, camera, uniforms;

// Initialize global variables to store mouse position
let mouseX = 0;
let mouseY = 0;
let isRevealed = false;
let revealProgress = 0;
let clickPosition = { x: 0, y: 0 };

// Debug function to help identify issues
function debugLog(message) {
    console.log(`[Shader Debug]: ${message}`);
}

// Expose function to update shader mouse position
window.updateShaderMouse = function(x, y) {
    mouseX = x;
    mouseY = y;
    
    if (uniforms) {
        uniforms.u_mouse.value.x = x;
        uniforms.u_mouse.value.y = y;
    }
};

// Expose function to trigger the reveal animation
window.revealContent = function(x, y) {
    debugLog(`Reveal triggered at x: ${x}, y: ${y}`);
    isRevealed = true;
    clickPosition.x = x;
    clickPosition.y = y;
    
    // Remove click prompt immediately
    const clickPrompt = document.querySelector('.click-prompt');
    if (clickPrompt) {
        gsap.to(clickPrompt, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: function() {
                clickPrompt.remove();
                debugLog('Click prompt removed');
            }
        });
    }
    
    if (uniforms) {
        uniforms.u_clickPosition.value.x = x;
        uniforms.u_clickPosition.value.y = y;
        
        // Animate the reveal progress
        gsap.to(uniforms.u_revealProgress, {
            value: 1,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: function() {
                revealProgress = uniforms.u_revealProgress.value;
                debugLog(`Reveal progress: ${revealProgress}`);
                
                // When reveal progress hits threshold, show the content
                if (revealProgress > 0.3 && !document.body.classList.contains('content-visible')) {
                    document.body.classList.add('content-visible');
                    debugLog('Content visible class added');
                    
                    // Start content animations with a slight delay
                    setTimeout(() => {
                        if (typeof setupAnimations === 'function') {
                            debugLog('Calling setupAnimations');
                            setupAnimations();
                        } else {
                            debugLog('setupAnimations is not defined!');
                        }
                    }, 300);
                }
            }
        });
    } else {
        debugLog('Uniforms not initialized!');
    }
};

// Fragment shader code for luxury fluid simulation with enhanced effects
const fragmentShader = `
    precision highp float;
    
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_revealProgress;
    uniform vec2 u_clickPosition;
    
    // Improved noise functions
    
    // Hash function
    vec3 hash3(vec2 p) {
        vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                      dot(p, vec2(269.5, 183.3)),
                      dot(p, vec2(419.2, 371.9)));
        return fract(sin(q) * 43758.5453);
    }
    
    vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)),
                dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }
    
    // Gradient noise with improved interpolation
    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        
        // Cubic Hermite interpolation for smoother transitions
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                       dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                   mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                       dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
    }
    
    // Enhanced FBM (Fractal Brownian Motion) with domain warping
    float fbm(vec2 p) {
        float sum = 0.0;
        float amp = 0.5;
        float freq = 1.0;
        
        // Domain warping for more organic patterns
        p += 0.1 * vec2(sin(p.y * 0.8), cos(p.x * 0.8));
        
        // Loop unrolled for better performance
        sum += noise(p * freq) * amp;
        freq *= 2.17;
        amp *= 0.5;
        
        p += 0.1 * vec2(sin(p.y * 1.2), cos(p.x * 1.2));
        sum += noise(p * freq) * amp;
        freq *= 1.89;
        amp *= 0.5;
        
        p += 0.1 * vec2(sin(p.y * 1.4), cos(p.x * 1.4));
        sum += noise(p * freq) * amp;
        freq *= 2.13;
        amp *= 0.5;
        
        sum += noise(p * freq) * amp;
        
        return sum * 0.5 + 0.5; // normalize to [0, 1]
    }
    
    // Advanced flow field simulation for enhanced fluid effect
    vec2 flowField(vec2 position, float time, float scale) {
        vec2 resolution = u_resolution;
        vec2 p = position / resolution.xy;
        
        // Multi-layered flow for more complexity
        float noise1 = fbm(vec2(p.x * scale - time * 0.3, p.y * scale - time * 0.2));
        float noise2 = fbm(vec2(p.x * scale * 1.3 + time * 0.1 + 3.7, p.y * scale * 1.4 + time * 0.4 + 1.9));
        
        // Add vorticity
        float vorticity = fbm(vec2(p.x * scale * 0.5 - time * 0.1, p.y * scale * 0.5 - time * 0.05));
        
        // Create rotational component
        float angle = vorticity * 6.0;
        float s = sin(angle);
        float c = cos(angle);
        vec2 rotatedNoise = vec2(
            noise1 * c - noise2 * s,
            noise1 * s + noise2 * c
        );
        
        return rotatedNoise * (0.5 + 0.5 * fbm(p * 2.0 + time * 0.05));
    }
    
    // Particle system for added visual complexity
    float particles(vec2 uv, float time) {
        float particles = 0.0;
        
        // Increased number of particles from 7 to 12
        for (int i = 0; i < 12; i++) {
            // Create particle positions based on 3D hash with enhanced variation
            vec3 p = hash3(vec2(float(i), float(i * i)));
            
            // Animate particles with slightly faster movement
            vec2 position = vec2(
                fract(p.x + time * (0.15 + p.z * 0.12)),
                fract(p.y + time * (0.08 + p.z * 0.07))
            );
            
            // Calculate distance from uv to particle
            float dist = length(uv - position);
            
            // Increased particle intensity and reduced falloff distance
            particles += 0.0015 / (dist * dist * 120.0);
        }
        
        return particles;
    }
    
    // Enhanced fluid simulation
    vec3 fluid(vec2 uv, float time, vec2 mouse) {
        float scale = 3.0; // Scale of the fluid
        vec2 flow = flowField(gl_FragCoord.xy, time, scale);
        
        // Responsive fluid that reacts to mouse position
        float mouseInfluence = 0.015 / (0.01 + length(uv - (mouse * 0.5 + 0.5)));
        flow += vec2(mouseInfluence) * 0.1;
        
        // Get distorted position with improved displacement
        vec2 distortedUV = uv + flow * 0.03;
        
        // Create luxury colors - premium gold & deep navy
        vec3 goldColor = vec3(0.83, 0.73, 0.45); // Rich gold
        vec3 brightGold = vec3(0.92, 0.85, 0.55); // Brighter highlight gold for particles
        vec3 darkNavyColor = vec3(0.04, 0.06, 0.15); // Deep navy
        vec3 accentBlue = vec3(0.3, 0.38, 0.5); // Blue accent
        
        // Create fluid patterns with fbm and domain warping
        float fluid1 = fbm(distortedUV * scale + time * 0.1);
        float fluid2 = fbm(distortedUV * scale * 1.5 - time * 0.15 + flow * 3.0);
        float fluid3 = fbm(distortedUV * scale * 0.5 + time * 0.05 - flow * 2.0);
        
        // Combine patterns for rich fluid simulation
        float fluidPattern = fluid1 * 0.5 + fluid2 * 0.3 + fluid3 * 0.2;
        
        // Create a dynamic gradient with subtle color variations
        float gradient = uv.y * 1.5 + uv.x * 0.3 + fluid1 * 0.7 - fluid2 * 0.3;
        
        // Create depth with multiple layers and enhanced color mixing
        vec3 color = mix(darkNavyColor, accentBlue, fluid3 * 0.7);
        color = mix(color, goldColor, smoothstep(0.2, 0.7, fluid2 * fluid1));
        
        // Add particles with increased intensity
        float particleField = particles(distortedUV, time);
        
        // Add specular highlights that follow flow
        float specular = pow(fluid2 * fluid1, 5.0) * 0.8;
        color += specular * brightGold;
        
        // Enhanced particle highlights with increased brightness
        color += particleField * brightGold * 1.2;
        
        // Add swirling subtle color variations with more gold tint
        color += vec3(0.05, 0.04, 0.01) * fbm(distortedUV * 8.0 + time * 0.05);
        
        return color;
    }
    
    // Circle function for reveal effect with enhanced edge quality
    float circle(vec2 uv, vec2 center, float radius, float softness) {
        float dist = length(uv - center);
        return 1.0 - smoothstep(radius - softness, radius, dist);
    }
    
    void main() {
        // Normalized coordinates and aspect ratio
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        
        // Center the coordinates
        vec2 p = uv * 2.0 - 1.0;
        p.x *= aspect;
        
        // Calculate distance from mouse
        vec2 mousePos = u_mouse;
        mousePos.x *= aspect;
        float dist = length(p - mousePos);
        
        // Click position for reveal effect
        vec2 clickPos = u_clickPosition;
        clickPos.x *= aspect;
        
        // Create time variables for different animations
        float t = u_time * 0.2;
        float slowTime = u_time * 0.05;
        
        // Base color (deep navy background)
        vec3 color = vec3(0.04, 0.06, 0.12);
        
        // Calculate reveal circle with improved edge quality
        float revealRadius = u_revealProgress * 3.0;
        float revealCircle = circle(p, clickPos, revealRadius, 0.6);
        
        // Before reveal, show minimal design
        if (u_revealProgress < 0.01) {
            // Create subtle fluid animation for initial state
            vec2 slowFlow = flowField(gl_FragCoord.xy, slowTime, 1.0);
            float subtleFluid = fbm(uv + slowFlow * 0.01);
            
            // Create a subtle grid for structure with variable intensity
            vec2 grid = abs(fract(p * 8.0) - 0.5);
            float gridLine = min(grid.x, grid.y);
            float gridPattern = smoothstep(0.05, 0.0, gridLine);
            
            // Create more sophisticated pulse effect
            float pulse = sin(u_time) * 0.5 + 0.5;
            float pulse2 = sin(u_time * 0.7 + 0.5) * 0.5 + 0.5;
            
            // Mix colors for a subtle premium look with more depth
            vec3 deepNavy = vec3(0.04, 0.06, 0.12);
            vec3 subtleBlue = vec3(0.07, 0.10, 0.20);
            vec3 subtleGold = vec3(0.18, 0.17, 0.14);
            
            // Add subtle swirling background
            vec2 swirl = vec2(
                sin(uv.y * 3.0 + slowTime),
                cos(uv.x * 3.0 + slowTime)
            ) * 0.01;
            
            vec2 swirlUV = uv + swirl;
            float swirlPattern = fbm(swirlUV * 4.0 + slowTime * 0.3);
            
            // Create more sophisticated color mix
            color = mix(deepNavy, subtleBlue, subtleFluid * 0.3 + swirlPattern * 0.2);
            color = mix(color, subtleGold, gridPattern * 0.08 * (0.8 + 0.4 * pulse2));
            
            // Add particles in initial state
            float particleIntensity = particles(uv, t * 0.5) * 0.5;
            color += particleIntensity * vec3(0.83, 0.73, 0.45) * pulse;
            
            // Add mouse hover effect with improved falloff
            float hoverGlow = smoothstep(0.4, 0.0, dist);
            color += vec3(0.83, 0.73, 0.45) * hoverGlow * 0.15 * (pulse * 0.5 + 0.5);
            
            // Add subtle vignette
            float vignette = smoothstep(1.2, 0.5, length(p * 0.8));
            color *= vignette * 0.9 + 0.1;
        } 
        // During reveal animation
        else {
            // Apply enhanced fluid animation with reveal mask
            vec3 fluidColor = fluid(uv, t, u_mouse);
            
            // Calculate interactive distortion based on mouse and reveal progress
            float interactiveStrength = 0.07 * smoothstep(0.0, 0.5, u_revealProgress);
            vec2 interactiveDistortion = normalize(p - mousePos) * (1.0 - smoothstep(0.0, 0.6, dist)) * interactiveStrength;
            
            // Apply reveal circle effect with fluid and improved masking
            float revealMask = smoothstep(0.0, 0.4, revealCircle);
            color = mix(color, fluidColor, revealMask);
            
            // Add enhanced ripple effect emanating from click point
            float ripplePhase = u_revealProgress * 8.0;
            float rippleFreq = 20.0 + 10.0 * sin(u_time * 0.5);
            float ripple = sin(length(p - clickPos) * rippleFreq - ripplePhase);
            float rippleMask = smoothstep(revealRadius + 0.1, revealRadius - 0.6, length(p - clickPos));
            color += vec3(0.83, 0.73, 0.45) * ripple * rippleMask * 0.2;
            
            // Add particles
            float particleIntensity = particles(uv, t) * revealMask;
            color += particleIntensity * vec3(0.9, 0.8, 0.5) * 1.5;
            
            // Add subtle vignette
            float vignette = smoothstep(1.0, 0.6, length(p * 0.7));
            color *= vignette * 0.9 + 0.1;
            
            // Add dynamic light reflections that move with time
            float lightReflection = pow(sin(uv.y * 5.0 + uv.x * 3.0 + t) * 0.5 + 0.5, 3.0) * 0.05 * revealMask;
            color += lightReflection * vec3(0.9, 0.8, 0.5);
            
            // Mouse hover glow with gold accent after reveal
            vec3 accentColor = vec3(0.83, 0.73, 0.45); // Gold
            float mouseGlow = smoothstep(0.5, 0.0, dist) * 0.2;
            color += accentColor * mouseGlow * revealMask;
        }
        
        // Add subtle noise texture for premium film grain effect
        float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        color += noise * 0.012;
        
        // Add subtle color correction
        color = pow(color, vec3(0.95, 0.97, 1.05)); // Slight color grading
        
        gl_FragColor = vec4(color, 1.0);
    }
`;

// Vertex shader code
const vertexShader = `
    void main() {
        gl_Position = vec4(position, 1.0);
    }
`;

// Initialize shader
function initShader() {
    const canvas = document.getElementById('shader-canvas');
    if (!canvas) {
        debugLog('Shader canvas not found!');
        return;
    }
    
    debugLog('Initializing shader');
    
    try {
        // Create renderer
        renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            antialias: true, 
            alpha: true,
            precision: 'highp'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        
        // Initialize uniforms
        uniforms = {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2() },
            u_mouse: { value: new THREE.Vector2() },
            u_revealProgress: { value: 0 },
            u_clickPosition: { value: new THREE.Vector2() }
        };
        
        // Create shader material
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
        
        // Create a plane that fills the screen
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        // Set initial resolution
        onWindowResize();
        
        // Add resize listener
        window.addEventListener('resize', onWindowResize, false);
        
        // Add click listener to reveal content
        canvas.addEventListener('click', function(e) {
            debugLog('Canvas clicked');
            if (!isRevealed) {
                const x = (e.clientX / window.innerWidth) * 2 - 1;
                const y = -(e.clientY / window.innerHeight) * 2 + 1;
                window.revealContent(x, y);
            }
        });
        
        // Ensure setupAnimations is accessible
        if (typeof window.setupAnimations === 'function') {
            debugLog('setupAnimations is available globally');
        } else {
            // Make setupAnimations available globally if it's in script.js
            window.setupAnimations = window.setupAnimations || 
                                     (typeof setupAnimations === 'function' ? setupAnimations : null);
            debugLog(`setupAnimations global status: ${window.setupAnimations ? 'available' : 'not available'}`);
        }
        
        // Start animation loop
        animate();
        
        debugLog('Shader initialized successfully');
    } catch (error) {
        debugLog(`Error initializing shader: ${error.message}`);
        console.error(error);
    }
}

// Handle window resize
function onWindowResize() {
    if (!renderer) return;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (uniforms) {
        uniforms.u_resolution.value.x = window.innerWidth * window.devicePixelRatio;
        uniforms.u_resolution.value.y = window.innerHeight * window.devicePixelRatio;
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    render();
}

// Render the scene
function render() {
    if (uniforms) {
        uniforms.u_time.value += 0.01;
    }
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Initialize on window load
window.addEventListener('load', function() {
    debugLog('Window loaded, initializing shader');
    initShader();
});

// Fix for shader noise function
document.head.insertAdjacentHTML('beforeend', `
<script type="x-shader/x-fragment" id="fragmentShaderFix">
vec2 hash22(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
            dot(p, vec2(269.5, 183.3)));
            
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
</script>
`); 