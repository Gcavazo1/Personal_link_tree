// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    setupShaderBackground();
    setupFormValidation();
    setupAnimations();
    setupCustomCursor();
    
    // Test API connectivity
    testApiConnectivity();
});

// Custom cursor
function setupCustomCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursor = document.getElementById('custom-cursor');
    
    if (!cursorDot || !cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Update cursor dot position instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Move custom cursor with slight delay for smooth effect
        setTimeout(() => {
            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;
        }, 50);
        
        // Check if cursor is over interactable elements
        const target = e.target;
        
        // Add null checks to prevent errors
        if (!target) return;
        
        const isLink = target.tagName && target.tagName.toLowerCase() === 'a';
        const isButton = target.tagName && target.tagName.toLowerCase() === 'button';
        const isParentLink = target.parentElement && target.parentElement.tagName && target.parentElement.tagName.toLowerCase() === 'a';
        const isParentButton = target.parentElement && target.parentElement.tagName && target.parentElement.tagName.toLowerCase() === 'button';
        const hasContactClass = target.classList && target.classList.contains('contact-method');
        const parentHasContactClass = target.parentElement && target.parentElement.classList && target.parentElement.classList.contains('contact-method');
        const hasSocialClass = target.classList && target.classList.contains('social-link');
        const parentHasSocialClass = target.parentElement && target.parentElement.classList && target.parentElement.classList.contains('social-link');
        const hasMapClass = target.classList && target.classList.contains('map-overlay');
        const parentHasMapClass = target.parentElement && target.parentElement.classList && target.parentElement.classList.contains('map-overlay');
        
        if (isLink || isButton || isParentLink || isParentButton || 
            hasContactClass || parentHasContactClass || 
            hasSocialClass || parentHasSocialClass || 
            hasMapClass || parentHasMapClass) {
            
            cursor.style.width = '60px';
            cursor.style.height = '60px';
            cursor.style.opacity = '0.3';
            cursorDot.style.opacity = '1';
        } else {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.opacity = '0.6';
            cursorDot.style.opacity = '0.8';
        }
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Handle cursor leaving the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.6';
        cursorDot.style.opacity = '0.8';
    });
}

// Shader background
function setupShaderBackground() {
    if (!window.THREE) {
        console.warn('Three.js not loaded');
        return;
    }
    
    const canvas = document.getElementById('contact-shader-canvas');
    if (!canvas) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create noise texture
    const noiseTexture = createNoiseTexture();
    
    // Shader material
    const shaderMaterial = createShaderMaterial(noiseTexture);
    
    // Create mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);
    
    // Scroll and mouse tracking
    let scrollY = 0;
    let scrollVelocity = 0;
    let lastScrollY = 0;
    let mousePosition = new THREE.Vector2(0.5, 0.5);
    
    // Track scrolling
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        
        // Update scroll velocity
        scrollVelocity = scrollY - lastScrollY;
        lastScrollY = scrollY;
    });
    
    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        mousePosition.x = e.clientX / width;
        mousePosition.y = 1 - e.clientY / height; // Invert Y for shader space
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        
        renderer.setSize(width, height);
    });
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
        const elapsedTime = clock.getElapsedTime();
        
        // Update uniforms
        shaderMaterial.uniforms.u_time.value = elapsedTime;
        shaderMaterial.uniforms.u_resolution.value.set(width, height);
        shaderMaterial.uniforms.u_mouse.value.copy(mousePosition);
        shaderMaterial.uniforms.u_scroll.value = scrollY;
        shaderMaterial.uniforms.u_scrollVelocity.value = scrollVelocity;
        
        // Update section colors based on scroll position
        updateShaderColors(shaderMaterial, scrollY);
        
        // Render
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        
        // Dampen scroll velocity
        scrollVelocity *= 0.9;
    }
    
    animate();
}

// Create a noise texture for the shader
function createNoiseTexture() {
    const size = 256;
    const data = new Uint8Array(size * size * 4);
    
    for (let i = 0; i < size * size * 4; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;
        data[i+1] = noise;
        data[i+2] = noise;
        data[i+3] = 255;
    }
    
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.needsUpdate = true;
    return texture;
}

// Create the shader material
function createShaderMaterial(noiseTexture) {
    return new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2() },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
            u_scroll: { value: 0 },
            u_scrollVelocity: { value: 0 },
            u_noiseTexture: { value: noiseTexture },
            u_color1: { value: new THREE.Color('#151515') },
            u_color2: { value: new THREE.Color('#0a0a0a') },
            u_color3: { value: new THREE.Color('#d4b878') },
            u_colorMix: { value: 0 }
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

// Update shader colors based on scroll position
function updateShaderColors(shaderMaterial, scrollY) {
    // Create a smooth transition between sections
    const colorTransitionPoints = [
        { pos: 0.0, color1: '#151515', color2: '#0a0a0a', accent: '#d4b878' },  // Top
        { pos: 0.4, color1: '#131313', color2: '#080808', accent: '#c5b070' },  // Middle
        { pos: 1.0, color1: '#111111', color2: '#050505', accent: '#b6a068' }   // Bottom
    ];
    
    // Find the two transition points we're between
    let lowerPoint = colorTransitionPoints[0];
    let upperPoint = colorTransitionPoints[1];
    
    for (let i = 0; i < colorTransitionPoints.length - 1; i++) {
        if (scrollY >= colorTransitionPoints[i].pos && scrollY <= colorTransitionPoints[i + 1].pos) {
            lowerPoint = colorTransitionPoints[i];
            upperPoint = colorTransitionPoints[i + 1];
            break;
        }
    }
    
    // Calculate interpolation factor
    const range = upperPoint.pos - lowerPoint.pos;
    const factor = range !== 0 ? (scrollY - lowerPoint.pos) / range : 0;
    
    // Interpolate colors
    const color1 = new THREE.Color(lowerPoint.color1).lerp(new THREE.Color(upperPoint.color1), factor);
    const color2 = new THREE.Color(lowerPoint.color2).lerp(new THREE.Color(upperPoint.color2), factor);
    const color3 = new THREE.Color(lowerPoint.accent).lerp(new THREE.Color(upperPoint.accent), factor);
    
    // Update shader uniforms
    shaderMaterial.uniforms.u_color1.value = color1;
    shaderMaterial.uniforms.u_color2.value = color2;
    shaderMaterial.uniforms.u_color3.value = color3;
    shaderMaterial.uniforms.u_colorMix.value = Math.sin(scrollY * Math.PI) * 0.5 + 0.5;
}

// Form validation
function setupFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form (basic validation)
        let isValid = true;
        let errorMessages = [];
        
        if (!data.name || data.name.trim() === '') {
            isValid = false;
            errorMessages.push('Please enter your name');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            isValid = false;
            errorMessages.push('Please enter a valid email address');
        }
        
        if (!data['inquiry-type'] || data['inquiry-type'] === '') {
            isValid = false;
            errorMessages.push('Please select an inquiry type');
        }
        
        if (!data.message || data.message.trim() === '') {
            isValid = false;
            errorMessages.push('Please enter your message');
        }
        
        // Verify CAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            isValid = false;
            errorMessages.push('Please complete the CAPTCHA verification');
            showErrorMessage('Please complete the CAPTCHA verification to submit the form.');
            return;
        }
        
        // Handle validation result
        if (isValid) {
            // Add reCAPTCHA token to the data
            data['g-recaptcha-response'] = recaptchaResponse;
            
            // Submit form
            submitForm(data);
        } else {
            // Display error messages
            console.error('Form validation failed:', errorMessages);
            showErrorMessage('Please correct the following issues:<br>' + errorMessages.join('<br>'));
        }
    });
}

// Validate email format
function isValidEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

// Simulated form submission (replace with actual submission logic)
function submitForm(data) {
    // Show loading state
    const submitButton = document.querySelector('.submit-button');
    const originalButtonText = submitButton.innerHTML;
    
    submitButton.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>`;
    submitButton.disabled = true;
    
    // Log submission for debugging
    console.log('Submitting form to API:', data);
    
    // API endpoint URL - make sure this is correct
    const apiUrl = 'https://gabriel-cavazos-contact-api.vercel.app/api/contact';
    console.log('Submitting to URL:', apiUrl);
    
    // Send data to the backend server
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'omit', // Important for CORS
        mode: 'cors' // Explicitly set CORS mode
    })
    .then(response => {
        if (!response.ok) {
            // If the response is not in the 200-299 range
            // Get more detailed error information
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Server error occurred');
            });
        }
        return response.json();
    })
    .then(result => {
        // Reset button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        
        if (result.success) {
            // Show success message
            showSuccessMessage(result.message);
            document.getElementById('contact-form').reset();
            grecaptcha.reset(); // Reset the CAPTCHA
        } else {
            // Show error message
            showErrorMessage(result.message || 'Could not send your message. Please try again.');
        }
    })
    .catch(error => {
        // Handle error
        console.error('Submission error:', error);
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        
        // Check if it's a connection error
        const errorMessage = error.message || '';
        if (errorMessage.includes('Failed to fetch') || 
            errorMessage.includes('NetworkError') ||
            errorMessage.includes('connection') ||
            errorMessage.includes('network')) {
            showErrorMessage(`Unable to connect to the server. Please check your internet connection and try again, or email me directly at gcavazo1@gmail.com.`);
        }
        // Display more user-friendly error message
        else if (errorMessage.includes('CAPTCHA')) {
            showErrorMessage('CAPTCHA verification failed. Please refresh the page and try again.');
        } else {
            showErrorMessage('Error connecting to server. Please try again later or contact us directly at gcavazo1@gmail.com.');
        }
    });
}

// Display success message
function showSuccessMessage(message) {
    // Create success message element
    const successElement = document.createElement('div');
    successElement.className = 'message-overlay success-message';
    successElement.innerHTML = `
        <div class="message-box">
            <div class="message-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Message Sent!</h3>
            <p>${message}</p>
            <button class="close-message">Close</button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(successElement);
    
    // Add animation
    setTimeout(() => {
        successElement.classList.add('visible');
    }, 10);
    
    // Handle close button
    successElement.querySelector('.close-message').addEventListener('click', () => {
        successElement.classList.remove('visible');
        setTimeout(() => {
            document.body.removeChild(successElement);
        }, 300);
    });
}

// Display error message
function showErrorMessage(message) {
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'message-overlay error-message';
    errorElement.innerHTML = `
        <div class="message-box">
            <div class="message-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <h3>Something Went Wrong</h3>
            <p>${message}</p>
            <button class="close-message">Close</button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(errorElement);
    
    // Add animation
    setTimeout(() => {
        errorElement.classList.add('visible');
    }, 10);
    
    // Handle close button
    errorElement.querySelector('.close-message').addEventListener('click', () => {
        errorElement.classList.remove('visible');
        setTimeout(() => {
            document.body.removeChild(errorElement);
        }, 300);
    });
}

// Animations
function setupAnimations() {
    // Initialize animations
    const elementsToAnimate = document.querySelectorAll('.section-to-animate');
    
    // Set up Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Adjust based on when you want animation to trigger
    });
    
    // Observe all elements
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Initial animation for elements that are already visible
    setTimeout(() => {
        elementsToAnimate.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('animate-in');
                observer.unobserve(element);
            }
        });
    }, 100);
}

// Test API connectivity
function testApiConnectivity() {
    console.log('Testing API connectivity...');
    const apiUrl = 'https://gabriel-cavazos-contact-api.vercel.app/api/health';
    
    fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
    })
    .then(response => {
        if (!response.ok) {
            console.error('API health check failed with status:', response.status);
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data && data.status === 'ok') {
            console.log('API health check passed:', data);
        } else {
            console.error('API health check returned unexpected data:', data);
        }
    })
    .catch(error => {
        console.error('API health check failed:', error);
    });
} 