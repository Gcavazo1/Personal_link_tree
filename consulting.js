// Initialize all components when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations and shader effects
    initSmoothScroll();
    initCursor();
    initScrollAnimations();
    
    // Form handling
    initContactForm();
    
    // Add section change detection for shader effects
    detectSectionChanges();
});

// Smooth scrolling with Lenis
let lenis;
function initSmoothScroll() {
    // Initialize Lenis for smooth scrolling
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false
    });

    // Integrate with shader for scroll-based effects
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        // Update shader uniforms with scroll data
        if (window.updateShaderScroll) {
            window.updateShaderScroll(scroll, velocity, progress);
        }
        
        // Check for sections entering viewport
        checkSectionsInView(scroll);
    });

    // Start the animation loop for both Lenis and shaders
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement, {
                    offset: -50,
                    duration: 1.2
                });
            }
        });
    });
}

// Custom cursor implementation
function initCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;
    let isVisible = false;
    
    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor on movement
        if (!isVisible) {
            isVisible = true;
            cursor.style.opacity = 0.6;
            cursorDot.style.opacity = 0.8;
        }
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        isVisible = false;
        cursor.style.opacity = 0;
        cursorDot.style.opacity = 0;
    });
    
    // Handle interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .service-card, .package-card');
    
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '60px';
            cursor.style.height = '60px';
            cursor.style.backgroundColor = 'rgba(154, 132, 120, 0.1)';
            cursor.style.borderWidth = '1px';
            cursorDot.style.backgroundColor = 'var(--consulting-secondary)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.borderWidth = '1px';
            cursorDot.style.backgroundColor = 'var(--consulting-secondary)';
        });
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Calculate smooth movement with easing
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursorDotX += (mouseX - cursorDotX) * 0.4;
        cursorDotY += (mouseY - cursorDotY) * 0.4;
        
        // Apply position
        if (cursor) cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        if (cursorDot) cursorDot.style.transform = `translate(${cursorDotX}px, ${cursorDotY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// Implement scroll-based animations
function initScrollAnimations() {
    const allSections = document.querySelectorAll('.section-to-animate');
    const heroContent = document.querySelector('.hero-content');
    
    // Animate hero section immediately
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = 1;
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Set initial state for all sections
    allSections.forEach(section => {
        // Get all elements that need animation
        const sectionHeader = section.querySelector('.section-header');
        const cards = section.querySelectorAll('.service-card, .package-card, .process-step, .testimonial-slide');
        const contactForm = section.querySelector('.contact-form');
        
        // Set initial opacity
        if (sectionHeader) {
            sectionHeader.style.opacity = 0;
            sectionHeader.style.transform = 'translateY(20px)';
        }
        
        // Set initial card states
        cards.forEach((card, index) => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.dataset.delay = index * 100; // Stagger delay
        });
        
        // Set contact form initial state
        if (contactForm) {
            contactForm.style.opacity = 0;
            contactForm.style.transform = 'translateY(20px)';
        }
    });
}

// Check if sections are in viewport and animate them
function checkSectionsInView(scrollPos) {
    const allSections = document.querySelectorAll('.section-to-animate');
    
    allSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollPos;
        const sectionMiddle = sectionTop + (rect.height / 2);
        
        // Trigger when section is 20% in view
        const triggerPoint = window.innerHeight * 0.8;
        
        if (rect.top < triggerPoint && rect.bottom > 0) {
            // Section is in view, animate elements
            animateSection(section);
            
            // Notify shader about section change
            const sectionId = section.getAttribute('id');
            if (window.updateShaderSection) {
                window.updateShaderSection(sectionId, (sectionMiddle - scrollPos) / window.innerHeight);
            }
        }
    });
}

// Animate elements within a section
function animateSection(section) {
    // Animate section header
    const sectionHeader = section.querySelector('.section-header');
    if (sectionHeader && sectionHeader.style.opacity === '0') {
        setTimeout(() => {
            sectionHeader.style.opacity = 1;
            sectionHeader.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animate cards with staggered delay
    const cards = section.querySelectorAll('.service-card, .package-card, .process-step, .testimonial-slide');
    cards.forEach(card => {
        if (card.style.opacity === '0') {
            const delay = parseInt(card.dataset.delay) || 0;
            setTimeout(() => {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }, 300 + delay);
        }
    });
    
    // Animate contact form
    const contactForm = section.querySelector('.contact-form');
    if (contactForm && contactForm.style.opacity === '0') {
        setTimeout(() => {
            contactForm.style.opacity = 1;
            contactForm.style.transform = 'translateY(0)';
        }, 400);
    }
}

// Track current section for shader effects
function detectSectionChanges() {
    // Create Intersection Observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                // Update shader with current section
                if (window.updateActiveSection) {
                    window.updateActiveSection(sectionId);
                }
            }
        });
    }, options);
    
    // Observe all sections
    document.querySelectorAll('section[data-scroll-section]').forEach(section => {
        observer.observe(section);
    });
}

// Form handling
function initContactForm() {
    const form = document.getElementById('consulting-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const company = this.querySelector('#company').value;
            const service = this.querySelector('#service').value;
            const message = this.querySelector('#message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showFormError('Please fill out all required fields.');
                return;
            }
            
            // Simulate form submission
            showFormLoading();
            
            // Mock a network request (would be an actual API call in production)
            setTimeout(() => {
                console.log('Form submitted:', { name, email, company, service, message });
                showFormSuccess();
                
                // Reset form after success
                form.reset();
            }, 1500);
        });
    }
}

// Form feedback functions
function showFormLoading() {
    const submitButton = document.querySelector('.submit-button');
    if (submitButton) {
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
    }
}

function showFormSuccess() {
    const submitButton = document.querySelector('.submit-button');
    const form = document.getElementById('consulting-form');
    
    if (submitButton) {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent';
        submitButton.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            submitButton.innerHTML = 'Send Inquiry';
            submitButton.style.backgroundColor = 'var(--consulting-secondary)';
            submitButton.disabled = false;
        }, 3000);
    }
    
    // Show success message
    if (form) {
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success-message';
        successMsg.innerHTML = 'Thank you for your inquiry! We\'ll be in touch shortly.';
        
        // Insert message before the form
        form.parentNode.insertBefore(successMsg, form);
        
        // Animate message
        setTimeout(() => {
            successMsg.style.opacity = 1;
        }, 100);
        
        // Remove message after delay
        setTimeout(() => {
            successMsg.style.opacity = 0;
            setTimeout(() => {
                successMsg.remove();
            }, 500);
        }, 5000);
    }
}

function showFormError(message) {
    const submitButton = document.querySelector('.submit-button');
    const form = document.getElementById('consulting-form');
    
    if (submitButton) {
        submitButton.innerHTML = 'Send Inquiry';
        submitButton.disabled = false;
    }
    
    // Show error message
    if (form) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'form-error-message';
        errorMsg.innerHTML = message;
        
        // Insert message before the form
        form.parentNode.insertBefore(errorMsg, form);
        
        // Animate message
        setTimeout(() => {
            errorMsg.style.opacity = 1;
        }, 100);
        
        // Remove message after delay
        setTimeout(() => {
            errorMsg.style.opacity = 0;
            setTimeout(() => {
                errorMsg.remove();
            }, 500);
        }, 4000);
    }
}

// Helper function to detect if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
} 