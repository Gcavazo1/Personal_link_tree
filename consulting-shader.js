// ConsultingShader.js - Advanced shader effects for the consulting page
// Using Three.js for WebGL rendering

// Initialize the shader when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initShaders);

// Global variables
let shaderCanvas;
let renderer, scene, camera;
let shaderMaterial, planeMesh;
let mouse = { x: 0, y: 0 };
let targetMouse = { x: 0, y: 0 };
let scrollProgress = 0;
let scrollVelocity = 0;
let currentSection = 'hero';
let clock;
let noiseTexture;

// Section color palettes with associated colors for each section
const sectionColors = {
    'hero': {
        primary: new THREE.Color('#151515'),
        secondary: new THREE.Color('#9a8478'),
        accent: new THREE.Color('#d4b878')
    },
    'services': {
        primary: new THREE.Color('#131313'),
        secondary: new THREE.Color('#8a7468'),
        accent: new THREE.Color('#c5b070')
    },
    'packages': {
        primary: new THREE.Color('#111111'),
        secondary: new THREE.Color('#7a6458'),
        accent: new THREE.Color('#b6a068')
    },
    'process': {
        primary: new THREE.Color('#0f0f0f'),
        secondary: new THREE.Color('#6a5448'),
        accent: new THREE.Color('#a79060')
    },
    'testimonials': {
        primary: new THREE.Color('#0c0c0c'),
        secondary: new THREE.Color('#5a4438'),
        accent: new THREE.Color('#987c50')
    },
    'contact': {
        primary: new THREE.Color('#0a0a0a'),
        secondary: new THREE.Color('#4a3428'),
        accent: new THREE.Color('#896c40')
    }
};

// Initialize shaders and Three.js scene
function initShaders() {
    shaderCanvas = document.getElementById('scroll-shader-canvas');
    if (!shaderCanvas) return;
    
    // Set up THREE.js renderer
    renderer = new THREE.WebGLRenderer({
        canvas: shaderCanvas,
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create scene and camera
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(
        -1, // left
        1, // right
        1, // top
        -1, // bottom
        0.1, // near
        1000 // far
    );
    camera.position.z = 1;
    
    // Load noise texture
    const textureLoader = new THREE.TextureLoader();
    noiseTexture = textureLoader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABCpJREFUWEeVl9uOHEUQhr+qnp3ZXa/XxtgYDIYAQuQiSnIRRQpIkeABeA9ueQ8eIleREim5SZQrilAQNomJDdiyvd7D7EyfKlXVPT2zs15Dgmh2e6a7u/7646+q2hIvfPTFPB28Y1S8ZYy8ZpR6I03SrVKqiRTve1sp0Vn5HiuhmHrn+84VO855Y4xxo9I5d+acPzbWHRZlcfjlR6/uaUTlLxae2KZ9+OlMm4+11ntKJzIe5zSbJORZQp4pkkSjlH7uJTjnGY4rBqMJw9GEsrSUZWXT5H7h3KefP7j/XQ+l30ee+vCzr0bpyn1V5I2N9Q47V7rsrnfYWNNk2qBU8kL+F5Djk4zDow7Pjrqc9Ies9G6+d/vH7zxAA/DRF99bVTR/urre5O0312htNsmL9LmYP9FczpTVBIS+4ej4hIf/PBulXX6AMdXJwf17vQBw/+6hb20O3nr/vQ2ubbRJswSlVRR/eG6GWc8h8z4+x+ceOxM+wFiH955ev8uPPz2VKvnUVwf3bgTTBYD7d3+hXVzeev+DTa5fbVHkKVqpGPdCVVGFdgExZXw2vHAWKiLGQ5qmOOt4+Muag/u/WSn2kpW1ax/f/WY5gLu/0l5Z3rx5Y51XtwoaeUqS6EXxqd2iLKI7O0vDc2Uzr8IZXPCbvjvj0eO1oxh/DwC+OnhvOYCfabXXX755c42Njeau0ljl4fU5vwxg0kX71aCBU3yYihjH02ddHj9dH3qT/wUA3/1Cq72y/cbNG2usrTZo5AlJqkkSTbIAIP4NbUEHXUwRIgUr+IyxnkePn3He7Z/YychU3pdrwDuSorlzY6fF1uYKjUZCnqsQYqWCW7RKUBgyCGFOCNmiS3QhqzH3s3yZwdBw+KTL8fHg1LnxozgR40GUajR3rm6l7Gyv0CxysiwhTTWJDgABSiWgE9ApPkvRKsQdYs/KECZjCQAfnxeGp0+7PHvWd1X5uRcfEYBOG9fbW8XW9faZADRahRDPARR5RqM5A6Cn7V8EIPJiwHGvy8nJoJM2stfrJ5fEEF0FI06cXc+ypl5vZKw0MzLNojbC98XamGlwzhVgLVVl6fcnDIaGojj5zXt/z6P+9kZ9BXi8NxRF+tbGWsGVKy2KPKPICxpZRpZrUl2Peg3xzPtwxToPJupgrE2oKk9ZVpyeD+j1BqYsxydm2Pstcc5/7yw/xGFUAOg0z265tHl9e63J5maLZqMgTZOwchIVfbAY25lrVPCHZTQacXrWo9s/NcPh8UPn7D3nzaNEu2/kfGHZng0jEaC5M2nt7LS3t9NrO5vrjVZrtZElSappFHkgT9MsrH3vfFkZM54Me/1e/3TY6Zz0uoPTYVVNTrwZ/+3M5MSWjxxMHz+X6/nnfn5/+O/fpfgLe91MTD5YCgsAAAAASUVORK5CYII=');
    noiseTexture.wrapS = THREE.RepeatWrapping;
    noiseTexture.wrapT = THREE.RepeatWrapping;
    
    // Create shader material
    shaderMaterial = createShaderMaterial();
    
    // Create plane mesh that fills the screen
    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    planeMesh = new THREE.Mesh(planeGeometry, shaderMaterial);
    scene.add(planeMesh);
    
    // Set up clock for animation
    clock = new THREE.Clock();
    clock.start();
    
    // Set up event listeners
    setupEventListeners();
    
    // Start animation loop
    animate();
    
    // Expose methods to window for external control
    window.updateShaderScroll = updateScrollProgress;
    window.updateShaderSection = updateCurrentSection;
    window.updateActiveSection = updateActiveSection;
}

// Create the shader material with custom shaders
function createShaderMaterial() {
    return new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0.0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
            u_scroll: { value: 0.0 },
            u_scrollVelocity: { value: 0.0 },
            u_noiseTexture: { value: noiseTexture },
            u_color1: { value: sectionColors.hero.primary },
            u_color2: { value: sectionColors.hero.secondary },
            u_color3: { value: sectionColors.hero.accent },
            u_colorMix: { value: 0.0 }
        },
        vertexShader: `
            varying vec2 vUv;
            
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            uniform float u_scroll;
            uniform float u_scrollVelocity;
            uniform sampler2D u_noiseTexture;
            uniform vec3 u_color1;
            uniform vec3 u_color2;
            uniform vec3 u_color3;
            uniform float u_colorMix;
            
            varying vec2 vUv;
            
            // Simplex 2D noise function
            vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
            
            float snoise(vec2 v){
                const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1;
                i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod(i, 289.0);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                  dot(x12.zw,x12.zw)), 0.0);
                m = m*m ;
                m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }
            
            // Gold color helper
            vec3 goldColor(float brightness) {
                return vec3(0.83, 0.68, 0.21) * brightness;
            }
            
            void main() {
                // Calculate aspect-corrected UVs
                vec2 uv = vUv;
                vec2 aspect = u_resolution / min(u_resolution.x, u_resolution.y);
                vec2 uvAspect = (uv - 0.5) * aspect + 0.5;
                
                // Create base gradient
                float gradient = smoothstep(0.0, 1.0, uvAspect.y);
                
                // Mouse interaction
                float mouseDist = distance(uvAspect, u_mouse);
                float mouseGlow = smoothstep(0.6, 0.0, mouseDist) * 0.5;
                
                // Enhanced scroll effects
                float scrollSpeed = abs(u_scrollVelocity) * 2.0;
                float scrollWarp = sin(uvAspect.y * 10.0 + u_scroll * 0.1) * 0.02;
                float scrollLines = sin(uvAspect.y * 50.0 + u_scroll * 0.2) * 0.01 * scrollSpeed;
                
                // Dynamic noise pattern
                vec2 noiseCoord = uvAspect * 3.0;
                noiseCoord.y += u_time * 0.1;
                noiseCoord.x += sin(u_time * 0.2) * 0.2;
                float noise1 = snoise(noiseCoord) * 0.5 + 0.5;
                
                // Second layer of noise for more complexity
                vec2 noiseCoord2 = uvAspect * 2.0 - u_time * 0.05;
                float noise2 = snoise(noiseCoord2) * 0.5 + 0.5;
                
                // Combine different noise layers
                float finalNoise = mix(noise1, noise2, 0.5) * 0.3;
                
                // Add parallax effect based on mouse position
                vec2 parallaxOffset = (u_mouse - 0.5) * 0.1;
                vec2 uvWithParallax = uvAspect + parallaxOffset * (1.0 - gradient);
                
                // Create flowing pattern
                float flowPattern = sin(uvWithParallax.x * 10.0 + u_time * 0.5 + u_scroll * 0.05) * 
                                    cos(uvWithParallax.y * 8.0 - u_time * 0.3) * 0.5 + 0.5;
                
                // Enhanced light beams effect - more golden
                float beam = pow(sin(uvAspect.x * 3.14159 * 2.0 + u_time * 0.2), 20.0) * 0.15;
                beam *= smoothstep(0.4, 0.0, abs(uvAspect.y - 0.5));
                
                // Enhanced particles effect - more gold particles
                float particles = 0.0;
                float goldParticles = 0.0;
                
                // Regular particles
                for (int i = 0; i < 6; i++) {
                    float idx = float(i) / 6.0;
                    vec2 particleUV = uvAspect;
                    particleUV.y -= mod(u_time * (0.1 + idx * 0.1) + idx * 0.5, 1.0);
                    particleUV.x += sin(particleUV.y * 10.0 + u_time * idx) * 0.2;
                    float size = 0.004 * (sin(idx * 6.28 + u_time) * 0.5 + 1.5);
                    particles += smoothstep(size, 0.0, length(fract(particleUV * 10.0) - 0.5));
                }
                
                // Gold accent particles (larger, fewer, slower)
                for (int i = 0; i < 4; i++) {
                    float idx = float(i) / 4.0;
                    vec2 particleUV = uvAspect;
                    particleUV.y -= mod(u_time * (0.05 + idx * 0.05) + idx * 0.7, 1.0);
                    particleUV.x += sin(particleUV.y * 5.0 + u_time * idx * 0.5) * 0.3;
                    float size = 0.007 * (sin(idx * 6.28 + u_time * 0.5) * 0.5 + 1.5);
                    goldParticles += smoothstep(size, 0.0, length(fract(particleUV * 5.0) - 0.5));
                }
                
                // Enhanced vignette effect with golden edge
                float vignetteRadius = length(uvAspect - 0.5) * 1.8;
                float vignetteDark = smoothstep(0.7, 1.4, vignetteRadius); // Darker outer vignette
                float vignetteGold = smoothstep(0.5, 1.0, vignetteRadius) * smoothstep(1.2, 0.8, vignetteRadius); // Gold ring
                
                // Color mixing
                vec3 baseColor = mix(u_color1, u_color2, gradient + scrollWarp + finalNoise * 0.3);
                baseColor = mix(baseColor, u_color3, flowPattern * 0.2);
                
                // Apply lighting effects
                baseColor += mouseGlow * vec3(1.0, 0.95, 0.9);
                baseColor += beam * goldColor(1.2); // More golden beams
                baseColor += particles * 0.15 * mix(vec3(1.0), goldColor(1.0), 0.3); // Regular particles
                baseColor += goldParticles * 0.25 * goldColor(1.3); // Gold particles are brighter
                
                // Apply gold vignette
                baseColor = mix(baseColor, goldColor(0.4), vignetteGold * 0.15);
                
                // Apply color transition based on section
                baseColor = mix(baseColor, u_color3, u_colorMix * 0.3);
                
                // Final color with effects
                vec3 finalColor = baseColor * (1.0 - vignetteDark * 0.8); // Stronger vignette
                
                // Add film grain
                float grain = texture2D(u_noiseTexture, uv * 3.0 + vec2(u_time * 0.1, 0.0)).r * 0.05 - 0.025;
                finalColor += grain;
                
                // Apply subtle color correction - slightly warmer
                finalColor = pow(finalColor, vec3(0.95, 0.97, 1.0));
                
                gl_FragColor = vec4(finalColor, 0.7 + mouseDist * 0.15);
            }
        `,
        transparent: true
    });
}

// Set up event listeners for mouse and window resize
function setupEventListeners() {
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        targetMouse.x = e.clientX / window.innerWidth;
        targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        shaderMaterial.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    });
}

// Update shader uniforms with scroll data
function updateScrollProgress(scroll, velocity, progress) {
    if (shaderMaterial) {
        scrollProgress = scroll * 0.001; // Scale down for shader
        scrollVelocity = velocity * 0.01; // Scale down for shader
        
        // Update shader uniforms
        shaderMaterial.uniforms.u_scroll.value = scrollProgress;
        shaderMaterial.uniforms.u_scrollVelocity.value = scrollVelocity;
    }
}

// Update active section for the shader effects
function updateActiveSection(sectionId) {
    if (sectionId && sectionColors[sectionId]) {
        currentSection = sectionId;
    }
}

// Smoothly transition between section colors
function updateCurrentSection(sectionId, progress) {
    if (shaderMaterial && sectionColors[sectionId]) {
        // Set target colors
        shaderMaterial.uniforms.u_colorMix.value = progress;
        
        // Transition to new colors
        const targetColors = sectionColors[sectionId];
        shaderMaterial.uniforms.u_color1.value.lerp(targetColors.primary, 0.05);
        shaderMaterial.uniforms.u_color2.value.lerp(targetColors.secondary, 0.05);
        shaderMaterial.uniforms.u_color3.value.lerp(targetColors.accent, 0.05);
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update time
    const elapsedTime = clock.getElapsedTime();
    shaderMaterial.uniforms.u_time.value = elapsedTime;
    
    // Smooth mouse movement
    mouse.x += (targetMouse.x - mouse.x) * 0.1;
    mouse.y += (targetMouse.y - mouse.y) * 0.1;
    shaderMaterial.uniforms.u_mouse.value.set(mouse.x, mouse.y);
    
    // Render the scene
    renderer.render(scene, camera);
} 