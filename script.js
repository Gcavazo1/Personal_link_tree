// Link data - customize with your own links
const links = [
    {
        title: "Fiverr Profile",
        url: "https://www.fiverr.com/s/6Y217ER",
        icon: "⭐",
        description: "Hire me for premium web development and design services"
    },
    {
        title: "Dev Portfolio",
        url: "https://gcavazo1.github.io/GigaCode_Dev_Showcase_Website/",
        icon: "🚀",
        description: "Explore my complete development portfolio and showcase"
    },
    {
        title: "GitHub",
        url: "https://github.com/Gcavazo1",
        icon: "⟡",
        description: "Check out my open source projects and contributions"
    },
    {
        title: "Development Services",
        url: "#services-modal",
        icon: "◈",
        description: "Custom web development for discerning businesses",
        modal: true
    },
    {
        title: "Client Showcase",
        url: "#",
        icon: "✧",
        description: "Success stories and testimonials from select clients"
    },
    {
        title: "Digital Consulting",
        url: "consulting.html",
        icon: "◎",
        description: "Strategic digital presence consulting for businesses"
    },
    {
        title: "Contact",
        url: "contact.html",
        icon: "✉",
        description: "Get in touch for premium digital services"
    }
];

// Services offered - more premium and specific
const services = [
    "Luxury Web Design",
    "E-commerce Development",
    "Custom Web Applications",
    "UI/UX Design",
    "Personal Portfolios",
    "Website Audits & Analysis",
    "SEO Optimization",
    "Maintenance Plans",
    "Brand Identity",
    "Digital Consulting"
];

// Testimonials data - add real testimonials for credibility
const testimonials = [
    {
        quote: "Working with this designer was transformative for our brand. The attention to detail and premium aesthetic elevated our digital presence beyond expectations.",
        author: "Sarah Johnson",
        company: "Luxury Interiors Co.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        quote: "The level of sophistication and technical excellence delivered was exceptional. Our conversion rates have increased by 40% since the redesign.",
        author: "Michael Chen",
        company: "Prestige Ventures",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        quote: "A true artisan of digital design. The custom animations and attention to brand positioning created a website that perfectly captures our premium offering.",
        author: "Elizabeth Taylor",
        company: "Elite Boutique",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    }
];

// DOM elements
const linksContainer = document.querySelector('.links');
const profile = document.querySelector('.profile');
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

// Initialize animations with ultra-smooth feel
function setupAnimations() {
    console.log('[Debug] Setting up animations with ultra-smooth timing');
    
    // Profile animation with slower, more elegant reveal
    const profile = document.querySelector('.profile');
    if (profile) {
        gsap.from(profile, {
            y: 40,
            opacity: 0,
            duration: 1.8,
            ease: 'power2.out',
            delay: 0.5
        });
    }
    
    // Section headers with cascade effect
    const sectionHeaders = document.querySelectorAll('.section-header');
    if (sectionHeaders.length > 0) {
        gsap.from(sectionHeaders, {
            y: 30,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.3,
            delay: 0.8
        });
    }
    
    // Staggered animation for links
    const linkItems = document.querySelectorAll('.link-item');
    if (linkItems.length > 0) {
        gsap.fromTo(linkItems, {
            opacity: 0,
            y: 30,
            scale: 0.98
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 1.2,
            ease: "power3.out",
            delay: 1.0
        });
    }
    
    // Testimonial cards with staggered reveal
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
        gsap.fromTo(testimonialCards, {
            opacity: 0,
            y: 50,
            scale: 0.95
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.2,
            duration: 1.5,
            ease: "power2.out",
            delay: 1.2
        });
    }
    
    // Footer fade in animation with subtle bounce
    const footer = document.querySelector('.footer');
    if (footer) {
        gsap.from(footer, {
            opacity: 0,
            y: 20,
            duration: 1.5,
            ease: "back.out(1.2)",
            delay: 1.4
        });
    }
    
    // Social icons with staggered animations
    const socialIcons = document.querySelectorAll('.social-link');
    if (socialIcons.length > 0) {
        gsap.fromTo(socialIcons, {
            opacity: 0,
            scale: 0,
            y: 10
        }, {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.15,
            duration: 1,
            ease: "back.out(2)",
            delay: 1.6
        });
    }
    
    // Add subtle parallax effect for premium depth
    setupParallaxEffect();
}

// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');
    
    if (!cursor || !cursorDot) {
        console.error('[Debug] Custom cursor elements not found');
        return;
    }
    
    console.log('[Debug] Initializing custom cursor');
    
    // Make sure cursor is visible immediately
    gsap.set(cursor, { 
        opacity: 1, 
        scale: 1, 
        xPercent: -50, 
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    });
    
    gsap.set(cursorDot, { 
        opacity: 1, 
        scale: 1, 
        xPercent: -50, 
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    });
    
    // Variables to store cursor position
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let speed = 0.15; // Controls smoothness - lower is smoother

    // Create a smoother cursor movement using GSAP ticker instead of mousemove events
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Use GSAP ticker for silky smooth animation
    gsap.ticker.add(() => {
        // Interpolate position for primary cursor (smooth follow)
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        // Apply position with transform - using direct DOM manipulation for performance
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        
        // Dot follows mouse exactly for more precision
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });
    
    // Add special effects for interactive elements with enhanced animations
    const interactiveElements = document.querySelectorAll('a, button, .link-item, .social-link, .fallback-button');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Grow cursor with elastic effect for premium feel
            gsap.to(cursor, {
                width: '50px', 
                height: '50px', 
                opacity: 0.6,
                background: 'rgba(212, 184, 121, 0.15)',
                duration: 0.4,
                ease: "elastic.out(1, 0.3)"
            });
            
            // Shrink dot for contrast
            gsap.to(cursorDot, {
                opacity: 0,
                scale: 0.5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        el.addEventListener('mouseleave', () => {
            // Return to normal with smooth animation
            gsap.to(cursor, {
                width: '12px', 
                height: '12px', 
                opacity: 1,
                background: 'var(--accent)',
                duration: 0.6,
                ease: "power2.out"
            });
            
            // Restore dot
            gsap.to(cursorDot, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Generate link elements with enhanced functionality for modal
function generateLinks() {
    console.log('[Debug] Starting generateLinks');
    
    // First, find or create the section that will contain the links
    let section = document.querySelector('.section');
    if (!section) {
        console.log('[Debug] Creating new section');
        section = document.createElement('div');
        section.className = 'section';
        section.setAttribute('data-aos', 'fade-up');
        section.setAttribute('data-aos-delay', '100');
        
        // Create section header
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'section-header';
        sectionHeader.innerHTML = `
            <h2 class="section-title">Links</h2>
            <div class="section-divider"></div>
        `;
        section.appendChild(sectionHeader);
        
        // Add section to content
        const content = document.querySelector('.content');
        if (content) {
            content.appendChild(section);
        }
    }
    
    // Find or create links container
    let linksContainer = document.getElementById('links-container');
    if (!linksContainer) {
        console.log('[Debug] Creating new links container');
        linksContainer = document.createElement('div');
        linksContainer.id = 'links-container';
        linksContainer.className = 'links-container';
        section.appendChild(linksContainer);
    }
    
    console.log('[Debug] Clearing existing links');
    linksContainer.innerHTML = '';
    
    console.log('[Debug] Generating new links');
    links.forEach((link, index) => {
        const linkItem = document.createElement('a');
        linkItem.href = link.url;
        linkItem.className = 'link-item';
        
        // If link is modal, add modal trigger functionality
        if (link.modal) {
            linkItem.addEventListener('click', function(e) {
                e.preventDefault();
                openServicesModal();
            });
        } else {
            linkItem.target = '_blank';
            linkItem.rel = 'noopener noreferrer';
        }
        
        linkItem.setAttribute('data-aos', 'fade-up');
        linkItem.setAttribute('data-aos-delay', `${index * 100}`);
        
        const icon = document.createElement('div');
        icon.className = 'link-icon';
        icon.innerHTML = link.icon;
        
        const textContainer = document.createElement('div');
        textContainer.className = 'link-text';
        
        const title = document.createElement('div');
        title.className = 'link-title';
        title.textContent = link.title;
        
        const description = document.createElement('div');
        description.className = 'link-description';
        description.textContent = link.description;
        
        const arrow = document.createElement('div');
        arrow.className = 'link-arrow';
        arrow.innerHTML = '→';
        
        textContainer.appendChild(title);
        textContainer.appendChild(description);
        
        linkItem.appendChild(icon);
        linkItem.appendChild(textContainer);
        linkItem.appendChild(arrow);
        
        linksContainer.appendChild(linkItem);
        
        // Enhanced hover effects for premium feel
        const hoverTimeline = gsap.timeline({ paused: true });
        
        hoverTimeline
            .to(linkItem, { 
                y: -5, 
                scale: 1.01, 
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2), 0 0 15px rgba(212, 184, 121, 0.1)',
                borderColor: 'rgba(212, 184, 121, 0.15)',
                background: 'linear-gradient(180deg, rgba(19, 27, 46, 0.85), rgba(10, 15, 28, 0.95))',
                duration: 0.5, 
                ease: "power2.out" 
            }, 0)
            .to(icon, { 
                scale: 1.15, 
                rotation: 5,
                backgroundColor: 'rgba(212, 184, 121, 0.15)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', 
                duration: 0.5, 
                ease: "back.out(1.5)" 
            }, 0)
            .to(arrow, { 
                x: 3,
                opacity: 1, 
                color: 'var(--accent)',
                duration: 0.4, 
                ease: "power3.out" 
            }, 0)
            .to(description, { 
                color: 'var(--text-primary)', 
                duration: 0.5, 
                ease: "power2.out" 
            }, 0)
            .to(title, { 
                color: 'var(--text-highlight)', 
                duration: 0.5, 
                ease: "power2.out" 
            }, 0);
        
        linkItem.addEventListener('mouseenter', () => {
            hoverTimeline.play();
            linkItem.addEventListener('mousemove', handleLinkMouseMove);
        });
        
        linkItem.addEventListener('mouseleave', () => {
            hoverTimeline.reverse();
            linkItem.removeEventListener('mousemove', handleLinkMouseMove);
            
            gsap.to(linkItem, { 
                rotationX: 0, 
                rotationY: 0, 
                duration: 0.6, 
                ease: "power3.out" 
            });
        });
        
        function handleLinkMouseMove(e) {
            const rect = linkItem.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width) - 0.5;
            const yPercent = (y / rect.height) - 0.5;
            
            gsap.to(linkItem, { 
                rotationY: xPercent * 6,
                rotationX: yPercent * -6, 
                transformPerspective: 1000,
                duration: 0.6, 
                ease: "power2.out",
                overwrite: 'auto'
            });
            
            gsap.to(icon, {
                backgroundImage: `radial-gradient(circle at ${x}px ${y}px, rgba(212, 184, 121, 0.25), rgba(212, 184, 121, 0.08) 70%)`,
                duration: 0.8,
                ease: "power2.out",
                overwrite: 'auto'
            });
        }
    });
    
    console.log('[Debug] Links generation complete');
}

// Generate service categories
function generateServiceCategories() {
    // Only create categories if they don't already exist
    if (!document.querySelector('.categories')) {
        const categoriesContainer = document.createElement('div');
        categoriesContainer.className = 'categories';
        
        services.forEach(service => {
            const category = document.createElement('div');
            category.className = 'category';
            category.textContent = service;
            categoriesContainer.appendChild(category);
        });
        
        // Insert categories after the availability notice
        const availability = document.querySelector('.availability');
        if (availability && availability.parentNode) {
            availability.parentNode.insertBefore(categoriesContainer, availability.nextSibling);
        }
    }
}

// Generate testimonial section
function generateTestimonials() {
    // Only create testimonials if they don't already exist
    if (!document.querySelector('.testimonials-section')) {
        const testimonialsSection = document.createElement('div');
        testimonialsSection.className = 'testimonials-section';
        testimonialsSection.setAttribute('data-aos', 'fade-up');
        testimonialsSection.setAttribute('data-aos-delay', '200');
        
        // Add section title
        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'section-title';
        sectionTitle.innerHTML = `
            <h2>Client Testimonials</h2>
            <div class="section-title-line"></div>
        `;
        testimonialsSection.appendChild(sectionTitle);
        
        // Create testimonials container
        const testimonialsContainer = document.createElement('div');
        testimonialsContainer.className = 'testimonials-container';
        
        // Add testimonials
        testimonials.forEach((testimonial, index) => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            testimonialCard.setAttribute('data-delay', index);
            
            testimonialCard.innerHTML = `
                <div class="testimonial-quote">"${testimonial.quote}"</div>
                <div class="testimonial-author-container">
                    <div class="testimonial-author-image">
                        <img src="${testimonial.image}" alt="${testimonial.author}">
                    </div>
                    <div class="testimonial-author-info">
                        <div class="testimonial-author">${testimonial.author}</div>
                        <div class="testimonial-company">${testimonial.company}</div>
                    </div>
                </div>
            `;
            
            testimonialsContainer.appendChild(testimonialCard);
            
            // Add premium hover effects for testimonial cards
            testimonialCard.addEventListener('mouseenter', () => {
                gsap.to(testimonialCard, {
                    y: -10, 
                    scale: 1.02, 
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25), 0 0 20px rgba(212, 184, 121, 0.15)',
                    borderColor: 'rgba(212, 184, 121, 0.2)',
                    duration: 0.5,
                    ease: "power3.out"
                });
                
                // Animate the quote mark for extra premium feel
                const quoteChar = testimonialCard.querySelector('.testimonial-quote');
                if (quoteChar) {
                    gsap.to(quoteChar, {
                        color: 'var(--text-highlight)',
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });
            
            testimonialCard.addEventListener('mouseleave', () => {
                gsap.to(testimonialCard, {
                    y: 0, 
                    scale: 1, 
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                    duration: 0.5,
                    ease: "power3.out"
                });
                
                // Reset quote styling
                const quoteChar = testimonialCard.querySelector('.testimonial-quote');
                if (quoteChar) {
                    gsap.to(quoteChar, {
                        color: 'var(--text-primary)',
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        testimonialsSection.appendChild(testimonialsContainer);
        
        // Insert testimonials before the footer
        const content = document.querySelector('.content');
        const footer = document.querySelector('.footer');
        
        if (content && footer) {
            content.insertBefore(testimonialsSection, footer);
            
            // Add premium staggered reveal animations for testimonial cards
            // Will be triggered when testimonials are in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = testimonialsSection.querySelectorAll('.testimonial-card');
                        
                        gsap.fromTo(sectionTitle, 
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                        );
                        
                        gsap.fromTo(cards, 
                            { opacity: 0, y: 50, scale: 0.95 },
                            { 
                                opacity: 1, 
                                y: 0, 
                                scale: 1, 
                                stagger: 0.15, 
                                duration: 1, 
                                ease: "power3.out",
                                delay: 0.3,
                                onComplete: () => {
                                    observer.disconnect();
                                }
                            }
                        );
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(testimonialsSection);
        } else if (content) {
            content.appendChild(testimonialsSection);
        }
    }
}

// Create footer with copyright
function createFooter() {
    // Only create footer if it doesn't already exist
    if (!document.querySelector('.footer')) {
        const footer = document.createElement('div');
        footer.className = 'footer';
        
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `
            <p>&copy; ${currentYear} Your Name. All rights reserved.</p>
            <p>Crafting Bespoke Digital Experiences</p>
        `;
        
        // Append footer to content
        const content = document.querySelector('.content');
        if (content) {
            content.appendChild(footer);
        }
    }
}

// Create subtle parallax effects for depth
function setupParallaxEffect() {
    // Only initialize if window exists (browser environment)
    if (typeof window !== 'undefined') {
        // Parallax effect on profile
        window.addEventListener('mousemove', function(e) {
            // Get mouse position
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            // Apply subtle movement to profile elements
            const profileImage = document.querySelector('.profile-image');
            const profileBackdrop = document.querySelector('.profile-image-backdrop');
            const profileName = document.querySelector('.profile-name');
            
            if (profileImage) {
                gsap.to(profileImage, {
                    x: mouseX * 10,
                    y: mouseY * 10,
                    duration: 1,
                    ease: 'power1.out'
                });
            }
            
            if (profileBackdrop) {
                gsap.to(profileBackdrop, {
                    x: mouseX * 15,
                    y: mouseY * 15,
                    duration: 1,
                    ease: 'power1.out'
                });
            }
            
            if (profileName) {
                gsap.to(profileName, {
                    x: mouseX * 5,
                    y: mouseY * 5,
                    duration: 1,
                    ease: 'power1.out'
                });
            }
            
            // Apply subtle tilt to link cards for 3D effect
            const linkItems = document.querySelectorAll('.link-item');
            linkItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemX = ((rect.left + rect.width / 2) - e.clientX) / 25;
                const itemY = ((rect.top + rect.height / 2) - e.clientY) / 25;
                
                gsap.to(item, {
                    rotationY: -itemX,
                    rotationX: itemY,
                    transformPerspective: 900,
                    transformOrigin: 'center center',
                    duration: 0.8,
                    ease: 'power1.out'
                });
            });
        });
    }
}

// Handle mouse movement for shader effects
function handleMouseInteraction() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        
        // Pass mouse coordinates to shader if available
        if (window.updateShaderMouse) {
            window.updateShaderMouse(mouseX, mouseY);
        }
    });
    
    // For mobile devices
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
            
            if (window.updateShaderMouse) {
                window.updateShaderMouse(mouseX, mouseY);
            }
        }
    });
    
    // Add touch support for reveal
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0 && window.revealContent && !document.body.classList.contains('content-visible')) {
            const x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            const y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
            console.log('[Debug] Touch detected, calling revealContent with:', x, y);
            window.revealContent(x, y);
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize shaders for welcome screen
    if (typeof initShaders === 'function') {
        initShaders();
    }
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Add click events for canvas
    const canvas = document.getElementById('shader-canvas');
    if (canvas) {
        canvas.addEventListener('click', handleCanvasClick);
        console.log('[Debug] Canvas click event listener added');
    }
    
    // Add document click handler as fallback
    document.addEventListener('click', function(e) {
        if (e.target.id === 'shader-canvas') return;
        if (!document.body.classList.contains('content-visible')) {
            console.log('[Debug] Document click handler triggered content visibility');
            handleCanvasClick(e);
        }
    });
    
    // Add a keyboard event listener for accessibility
    document.addEventListener('keydown', function(e) {
        if ((e.key === ' ' || e.key === 'Enter') && !document.body.classList.contains('content-visible')) {
            console.log('[Debug] Key press detected, revealing content');
            handleCanvasClick(new MouseEvent('click'));
        }
    });
    
    // Initialize mouse/touch interaction for shaders
    if (typeof handleMouseInteraction === 'function') {
        handleMouseInteraction();
    }
    
    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize services modal
    setupServicesModal();
});

// Ensure all sections are visible after the page is loaded
function ensureContentVisible() {
    console.log('[Debug] Running ensureContentVisible');
    
    // Force content container to be visible
    const content = document.querySelector('.content');
    if (content) {
        console.log('[Debug] Setting content container styles');
        content.style.opacity = '1';
        content.style.visibility = 'visible';
        content.style.transform = 'translateY(0)';
        content.style.pointerEvents = 'all';
    } else {
        console.error('[Debug] Content container not found in ensureContentVisible');
    }
    
    // Force sections to be visible
    const allSections = document.querySelectorAll('.section, .testimonials-section, .footer, .link-item');
    console.log(`[Debug] Found ${allSections.length} sections to make visible`);
    allSections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.transform = 'translateY(0)';
    });
    
    // Make sure body has content-visible class
    if (!document.body.classList.contains('content-visible')) {
        console.log('[Debug] Adding content-visible class to body');
        document.body.classList.add('content-visible');
    }
    
    // Refresh AOS
    if (typeof AOS !== 'undefined') {
        console.log('[Debug] Final AOS refresh');
        AOS.refresh();
    }
}

// Handle canvas click for the click-to-explore functionality
function handleCanvasClick(e) {
    console.log('[Debug] Canvas clicked - Starting content reveal process');
    
    // Only trigger if content is not already visible
    if (!document.body.classList.contains('content-visible')) {
        console.log('[Debug] Content not yet visible, proceeding with reveal');
        
        // Force content to be visible immediately
        document.body.classList.add('content-visible');
        console.log('[Debug] Added content-visible class to body');
        
        // Hide click prompt with animation
        const clickPrompt = document.querySelector('.click-prompt');
        if (clickPrompt) {
            gsap.to(clickPrompt, {
                opacity: 0,
                visibility: 'hidden',
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    clickPrompt.style.display = 'none';
                    console.log('[Debug] Click prompt hidden');
                }
            });
        }
        
        // Create profile section first
        console.log('[Debug] Ensuring profile section exists');
        ensureProfileSection();
        
        // Generate other content
        console.log('[Debug] Starting content generation');
        generateLinks();
        console.log('[Debug] Links generated');
        generateServiceCategories();
        console.log('[Debug] Service categories generated');
        generateTestimonials();
        console.log('[Debug] Testimonials generated');
        
        // Force content to be visible
        const content = document.querySelector('.content');
        if (content) {
            console.log('[Debug] Making content visible');
            content.style.opacity = '1';
            content.style.visibility = 'visible';
            content.style.transform = 'translateY(0)';
            content.style.pointerEvents = 'all';
        } else {
            console.error('[Debug] Content container not found!');
        }
        
        // Create footer if it doesn't exist
        createFooter();
        console.log('[Debug] Footer created');
        
        // Try to use shader reveal if available
        if (typeof window.revealContent === 'function') {
            try {
                const x = (e.clientX / window.innerWidth) * 2 - 1;
                const y = -(e.clientY / window.innerHeight) * 2 + 1;
                console.log('[Debug] Calling revealContent with:', x, y);
                window.revealContent(x, y);
            } catch (error) {
                console.error('[Debug] Error in revealContent:', error);
            }
        }
        
        // Ensure animations run
        if (typeof setupAnimations === 'function') {
            console.log('[Debug] Running setupAnimations');
            setupAnimations();
        }
        
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            console.log('[Debug] Refreshing AOS');
            AOS.refresh();
        }
        
        // Ensure all content is visible after a delay
        setTimeout(() => {
            console.log('[Debug] Running final visibility check');
            ensureContentVisible();
        }, 100);
    }
}

// Ensure profile section exists
function ensureProfileSection() {
    console.log('[Debug] Starting ensureProfileSection');
    
    let profile = document.querySelector('.profile');
    console.log('[Debug] Existing profile section found:', !!profile);
    
    if (!profile) {
        console.log('[Debug] Creating new profile section');
        profile = document.createElement('div');
        profile.className = 'profile';
        profile.setAttribute('data-aos', 'fade-up');
        
        profile.innerHTML = `
            <div class="profile-image-container">
                <div class="profile-image">
                    <img src="assets/profilePicture.jpg" alt="Gabriel Cavazos" onerror="console.error('[Debug] Failed to load profile picture')">
                </div>
                <div class="profile-image-backdrop"></div>
                <div class="status-badge">Available for Work</div>
            </div>
            <h1 class="profile-name">Gabriel Cavazos</h1>
            <p class="profile-bio">Premium Web Design & Development Services</p>
            <div class="profile-tagline">Gigacode: Crafting digital experiences that elevate your brand</div>
        `;
        
        // Add to content container
        const content = document.querySelector('.content');
        if (content) {
            content.insertBefore(profile, content.firstChild);
            console.log('[Debug] Profile section added to content container');
        } else {
            console.error('[Debug] Content container not found!');
        }
    }
    
    // Ensure profile is visible
    if (profile) {
        profile.style.opacity = '1';
        profile.style.visibility = 'visible';
        console.log('[Debug] Profile section visibility enforced');
    }
}

// Services Modal Functions
function setupServicesModal() {
    console.log('[Debug] Setting up services modal functionality');
    
    const modalOverlay = document.getElementById('services-modal-overlay');
    const modal = document.getElementById('services-modal');
    const closeButton = document.getElementById('services-modal-close');
    
    if (!modalOverlay || !modal || !closeButton) {
        console.error('[Debug] Modal elements not found');
        return;
    }
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', closeServicesModal);
    
    // Close modal when clicking outside the modal
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeServicesModal();
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeServicesModal();
        }
    });
    
    // Update any service links in the modal to close the modal first
    const modalLinks = modal.querySelectorAll('a');
    modalLinks.forEach(link => {
        const originalHref = link.getAttribute('href');
        link.addEventListener('click', function(e) {
            closeServicesModal();
            
            // If link is a website or non-email, add a short delay
            if (originalHref && !originalHref.startsWith('mailto:')) {
                e.preventDefault();
                setTimeout(() => {
                    window.open(originalHref, '_blank');
                }, 300);
            }
        });
    });
    
    // Setup proposal form
    setupProposalForm();
    
    console.log('[Debug] Services modal setup complete');
}

// Setup proposal form handling
function setupProposalForm() {
    const proposalForm = document.getElementById('proposal-form');
    if (!proposalForm) {
        console.error('[Debug] Proposal form not found');
        return;
    }
    
    console.log('[Debug] Setting up proposal form');
    
    // Handle form submission
    proposalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const serviceType = document.getElementById('service-type').value;
        const projectScope = document.getElementById('project-scope').value;
        const budgetRange = document.getElementById('budget-range').value;
        const timeline = document.getElementById('timeline').value;
        const projectDetails = document.getElementById('project-details').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        console.log('[Debug] Form submitted with values:', {
            serviceType,
            projectScope,
            budgetRange,
            timeline,
            projectDetails,
            name,
            email
        });
        
        // Create proposal object
        const proposal = {
            serviceType,
            projectScope,
            budgetRange,
            timeline,
            projectDetails,
            name,
            email,
            date: new Date().toISOString()
        };
        
        // Show success message after form submission
        showProposalSuccess(proposal);
    });
    
    // Add elegant animation to form elements
    animateFormElements();
}

// Show success message after form submission
function showProposalSuccess(proposal) {
    const formElement = document.getElementById('proposal-form');
    const submitButton = formElement.querySelector('.submit-button');
    
    // Animate button to show success
    gsap.to(submitButton, {
        backgroundColor: 'rgba(212, 184, 121, 0.3)',
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
            // Replace button text with success message
            const originalText = submitButton.textContent;
            submitButton.textContent = "Proposal Generated!";
            
            // In a production environment, this would send data to a server
            // For now, redirect to email client with proposal details
            console.log('[Debug] Preparing to send proposal to gcavazo1@gmail.com');
            
            setTimeout(() => {
                // Create email content with proposal details
                try {
                    const subject = `Proposal Request: ${proposal.serviceType} from ${proposal.name}`;
                    let body = `New Proposal Request:\n\n`;
                    body += `Service: ${proposal.serviceType}\n`;
                    body += `Scope: ${proposal.projectScope}\n`;
                    body += `Budget: ${proposal.budgetRange}\n`;
                    body += `Timeline: ${proposal.timeline}\n\n`;
                    body += `Project Details: ${proposal.projectDetails}\n\n`;
                    body += `Contact Info:\n`;
                    body += `Name: ${proposal.name}\n`;
                    body += `Email: ${proposal.email}\n`;
                    
                    // Encode body for mailto link
                    const encodedBody = encodeURIComponent(body);
                    const encodedSubject = encodeURIComponent(subject);
                    
                    // If we're not in a testing environment, open the email client
                    if (window.location.protocol !== 'file:') {
                        // Create a temporary hidden link and click it
                        const emailLink = document.createElement('a');
                        emailLink.href = `mailto:gcavazo1@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
                        emailLink.style.display = 'none';
                        document.body.appendChild(emailLink);
                        
                        // Give time for the success animation to complete, then open email
                        setTimeout(() => {
                            emailLink.click();
                            document.body.removeChild(emailLink);
                        }, 500);
                    }
                } catch (error) {
                    console.error('[Debug] Error creating email link:', error);
                }
                
                // Reset button
                gsap.to(submitButton, {
                    backgroundColor: 'rgba(212, 184, 121, 0.1)',
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        setTimeout(() => {
                            submitButton.textContent = originalText;
                            formElement.reset();
                        }, 500);
                    }
                });
            }, 1500);
        }
    });
}

// Add elegant animations to form elements for premium feel
function animateFormElements() {
    const selects = document.querySelectorAll('.form-select');
    const inputs = document.querySelectorAll('.form-input');
    const textarea = document.querySelector('.form-textarea');
    
    // Function to handle focus animations
    const handleFocus = (element) => {
        gsap.to(element, {
            borderColor: 'var(--accent)',
            boxShadow: '0 0 0 2px rgba(212, 184, 121, 0.15)',
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Animate the label for extra luxury feel
        const label = element.previousElementSibling;
        if (label && label.classList.contains('form-label')) {
            gsap.to(label, {
                color: 'var(--accent)',
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };
    
    // Function to handle blur animations
    const handleBlur = (element) => {
        if (!element.value) {
            gsap.to(element, {
                borderColor: 'rgba(212, 184, 121, 0.15)',
                boxShadow: 'none',
                duration: 0.3,
                ease: "power2.out"
            });
        }
        
        // Reset label color
        const label = element.previousElementSibling;
        if (label && label.classList.contains('form-label')) {
            gsap.to(label, {
                color: 'var(--text-secondary)',
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };
    
    // Add event listeners to all form elements
    [...selects, ...inputs].forEach(element => {
        element.addEventListener('focus', () => handleFocus(element));
        element.addEventListener('blur', () => handleBlur(element));
    });
    
    if (textarea) {
        textarea.addEventListener('focus', () => handleFocus(textarea));
        textarea.addEventListener('blur', () => handleBlur(textarea));
    }
}

function openServicesModal() {
    console.log('[Debug] Opening services modal');
    
    const modalOverlay = document.getElementById('services-modal-overlay');
    const modal = document.getElementById('services-modal');
    
    if (!modalOverlay || !modal) {
        console.error('[Debug] Modal elements not found');
        return;
    }
    
    // Add active class to overlay first
    modalOverlay.classList.add('active');
    
    // Add active class to modal with a slight delay for the entrance animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Disable body scroll while allowing modal content to scroll
    document.body.style.overflow = 'hidden';
    
    // Ensure mouse wheel scrolling works in the modal content
    const modalContent = document.querySelector('.services-modal-content');
    if (modalContent) {
        // Explicitly set overflow properties to ensure scrolling works
        modal.style.overflowY = 'auto';
        modalContent.style.overflowY = 'auto';
        
        // Reset scroll position to top when opening
        modal.scrollTop = 0;
        modalContent.scrollTop = 0;
        
        // Add an event listener to prevent scrolling issues
        modal.addEventListener('wheel', function(e) {
            // Prevent the event from bubbling up to the body
            e.stopPropagation();
        });
        
        console.log('[Debug] Modal scroll properties set: overflowY =', modal.style.overflowY);
    }
    
    // Run animations for modal sections
    const sections = modal.querySelectorAll('.services-modal-section');
    gsap.fromTo(sections, 
        { opacity: 0, y: 30 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: "power3.out",
            delay: 0.3
        }
    );
    
    // Animate service cards with staggered effect
    const serviceCards = modal.querySelectorAll('.service-card');
    gsap.fromTo(serviceCards, 
        { opacity: 0, y: 20, scale: 0.95 },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.6, 
            stagger: 0.08, 
            ease: "back.out(1.7)",
            delay: 0.5
        }
    );
    
    // Animate process steps
    const processSteps = modal.querySelectorAll('.process-step');
    gsap.fromTo(processSteps, 
        { opacity: 0, x: -20 },
        { 
            opacity: 1, 
            x: 0, 
            duration: 0.5, 
            stagger: 0.07, 
            ease: "power2.out",
            delay: 0.7
        }
    );
    
    // Animate proposal builder form
    const proposalBuilder = modal.querySelector('.proposal-builder');
    if (proposalBuilder) {
        gsap.fromTo(proposalBuilder,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.9
            }
        );
    }
    
    console.log('[Debug] Services modal opened');
}

function closeServicesModal() {
    console.log('[Debug] Closing services modal');
    
    const modalOverlay = document.getElementById('services-modal-overlay');
    const modal = document.getElementById('services-modal');
    
    if (!modalOverlay || !modal) {
        console.error('[Debug] Modal elements not found');
        return;
    }
    
    // Remove active class from modal first
    modal.classList.remove('active');
    
    // Remove active class from overlay with a delay
    setTimeout(() => {
        modalOverlay.classList.remove('active');
    }, 300);
    
    // Re-enable body scroll
    document.body.style.overflow = '';
    
    console.log('[Debug] Services modal closed');
} 