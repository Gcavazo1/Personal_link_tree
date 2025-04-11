// Link data - customize with your own links
const links = [
    {
        title: "reNamerX",
        url: "https://re-namer-x.vercel.app/",
        icon: "📂",
        description: "Powerful desktop batch file renaming application"
    },
    {
        title: "QuickToken Platform",
        url: "https://quick-token-platform.vercel.app/",
        icon: "🪙",
        description: "ERC-20 smart contract deployment platform with integrated DApp"
    },
    {
        title: "Tauri Security Boilerplate",
        url: "https://gcavazo1.github.io/tauri-security-boilerplate/",
        icon: "🔐",
        description: "Enterprise-ready security template for Tauri 2.0 desktop apps"
    },
    {
        title: "Neon Rush Game",
        url: "https://neon-rush-game.vercel.app/",
        icon: "🎮",
        description: "Web-based infinite scroller game with cyberpunk aesthetics"
    },
    {
        title: "Norma's Creations",
        url: "https://normascreations-landing.vercel.app/",
        icon: "🎀",
        description: "Handcrafted premium wreaths and seasonal decorations"
    },
    {
        title: "CogniCube AI",
        url: "https://cognicube-landing.vercel.app/",
        icon: "🧠",
        description: "Advanced AI solutions for enterprise applications"
    },
    {
        title: "MoonPups",
        url: "https://moonpups-landing.vercel.app/",
        icon: "🌙",
        description: "Creative digital experiences for pet enthusiasts"
    },
    // Services start here
    {
        title: "Development Services",
        url: "#",
        icon: "💻",
        description: "Custom web development for discerning businesses",
        featured: true,
        modal: true
    },
    {
        title: "Digital Consulting",
        url: "/consulting.html",
        icon: "📊",
        description: "Strategic digital presence consulting for businesses",
        featured: true
    },
    {
        title: "Fiverr Profile",
        url: "https://www.fiverr.com/s/6Y217ER",
        icon: "⭐",
        description: "Hire me for premium web development and design services"
    },
    {
        title: "Dev Portfolio",
        url: "https://gcavazo1.github.io/GigaCode_Dev_Showcase_Website/",
        icon: "🔍",
        description: "View my professional development portfolio"
    },
    {
        title: "GitHub",
        url: "https://github.com/Gcavazo1",
        icon: "♦️",
        description: "Check out my open source projects and contributions"
    },
    {
        title: "Contact",
        url: "/contact.html",
        icon: "✉️",
        description: "Get in touch for project inquiries and collaborations"
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
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        quote: "The level of sophistication and technical excellence delivered was exceptional. Our conversion rates have increased by 40% since the redesign.",
        author: "Michael Chen",
        company: "Prestige Ventures",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        quote: "A true artisan of digital design. The custom animations and attention to brand positioning created a website that perfectly captures our premium offering.",
        author: "Elizabeth Taylor",
        company: "Elite Boutique",
        image: "https://randomuser.me/api/portraits/women/65.jpg"
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
    const content = document.querySelector('.content');
    if (!content) {
        console.error('[Debug] Content container not found');
        return;
    }
    
    // Clear any existing link sections
    const existingLinkSections = document.querySelectorAll('.links-section');
    existingLinkSections.forEach(section => section.remove());
    
    // Group links by category
    const creativeBuilds = links.slice(0, 3); // First 3 links are landing pages
    const serviceLinks = links.slice(3); // Remaining links are services
    
    // Create Creative Builds section
    createLinkSection('Creative Builds', creativeBuilds, content, 0);
    
    // Create Services section 
    createLinkSection('Services', serviceLinks, content, 1);
    
    console.log('[Debug] Links generation complete');
}

// Helper function to create a section of links
function createLinkSection(title, sectionLinks, parentContainer, sectionIndex) {
    console.log(`[Debug] Creating section: ${title}`);
    
    // Create section
    const section = document.createElement('div');
    section.className = 'section links-section';
    section.setAttribute('data-aos', 'fade-up');
    section.setAttribute('data-aos-delay', `${sectionIndex * 100}`);
    
    // Create section header
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    sectionHeader.innerHTML = `
        <h2 class="section-title">${title}</h2>
        <div class="section-divider"></div>
    `;
    section.appendChild(sectionHeader);
    
    // Create links container
    const linksContainer = document.createElement('div');
    linksContainer.className = 'links-container';
    section.appendChild(linksContainer);
    
    // Add links to container
    sectionLinks.forEach((link, index) => {
        const linkItem = document.createElement('a');
        linkItem.href = link.url;
        linkItem.className = 'link-item';
        
        // Add featured class if the link is featured
        if (link.featured) {
            linkItem.classList.add('featured');
            link.extraClasses = 'featured';
        }
        
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
        
        // Add featured star indicator if it's a featured link
        if (link.featured) {
            const featuredStar = document.createElement('div');
            featuredStar.className = 'featured-star';
            featuredStar.innerHTML = '★';
            linkItem.appendChild(featuredStar);
        }
        
        textContainer.appendChild(title);
        textContainer.appendChild(description);
        
        linkItem.appendChild(icon);
        linkItem.appendChild(textContainer);
        linkItem.appendChild(arrow);
        
        linksContainer.appendChild(linkItem);
        
        // Enhanced hover effects for premium feel
        const hoverTimeline = gsap.timeline({ paused: true });
        
        // Different hover animations for featured items
        if (link.featured) {
            hoverTimeline
                .to(linkItem, { 
                    y: -5, 
                    scale: 1.02, 
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 30px rgba(212, 184, 121, 0.2), 0 0 5px rgba(65, 147, 221, 0.5)',
                    borderColor: 'rgba(212, 184, 121, 0.5)',
                    background: 'linear-gradient(145deg, rgba(212, 184, 121, 0.25), rgba(212, 184, 121, 0.15))',
                    duration: 0.5, 
                    ease: "power2.out" 
                }, 0)
                .to(icon, { 
                    scale: 1.15, 
                    rotation: 5,
                    backgroundColor: 'rgba(212, 184, 121, 0.35)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 0 15px rgba(212, 184, 121, 0.4)', 
                    duration: 0.5, 
                    ease: "back.out(1.5)" 
                }, 0)
                .to(arrow, { 
                    x: 5,
                    opacity: 1, 
                    color: 'var(--accent)',
                    duration: 0.4, 
                    ease: "power3.out" 
                }, 0)
                .to(title, { 
                    textShadow: '0 0 20px rgba(212, 184, 121, 0.5)', 
                    duration: 0.5, 
                    ease: "power2.out" 
                }, 0);
        } else {
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
        }
        
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
    
    // Insert section after profile or after the last links section
    const portfolio = document.querySelector('.portfolio-section');
    if (title === 'Creative Builds') {
        // Insert Creative Builds after profile
        const profile = document.querySelector('.profile');
        if (profile) {
            parentContainer.insertBefore(section, profile.nextSibling);
        } else {
            parentContainer.insertBefore(section, parentContainer.firstChild);
        }
    } else {
        // Insert Services after Creative Builds
        const creativeBuildsSection = document.querySelector('.links-section');
        if (creativeBuildsSection) {
            parentContainer.insertBefore(section, creativeBuildsSection.nextSibling);
        } else {
            // If portfolio exists, insert before it
            if (portfolio) {
                parentContainer.insertBefore(section, portfolio);
            } else {
                parentContainer.appendChild(section);
            }
        }
    }
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
        sectionTitle.className = 'section-header';
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

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('[Debug] DOM fully loaded');
    
    // Set up custom cursor
    initCustomCursor();
    
    // Initialize WebGL shader
    initWebGLShader();
    
    // Set up two-column layout
    setupTwoColumnLayout();
    
    // Initialize animations and other features
    setupAnimations();
    
    // Set up services modal
    setupServicesModal();
    
    // Wait for user click to reveal content
    setupRevealOnClick();
    
    // Track mouse movement for the shader effects
    document.addEventListener('mousemove', function(e) {
        if (typeof window.updateShaderMouse === 'function') {
            const x = e.clientX / window.innerWidth;
            const y = 1.0 - e.clientY / window.innerHeight;
            window.updateShaderMouse(x, y);
        }
    });
});

// Initialize WebGL shader
function initWebGLShader() {
    console.log('[Debug] Initializing WebGL shader');
    
    const canvas = document.getElementById('shader-canvas');
    if (!canvas) {
        console.error('[Error] Shader canvas not found');
        return;
    }
    
    // Initialize shader - detailed implementation is in shaders.js
    if (typeof initShader === 'function') {
        initShader(canvas);
    } else {
        console.error('[Error] Shader initialization function not found');
    }
}

// Set up click to reveal content
function setupRevealOnClick() {
    console.log('[Debug] Setting up reveal on click');
    
    const pageWrapper = document.querySelector('.page-wrapper');
    const clickPrompt = document.getElementById('click-prompt');
    
    if (!pageWrapper || !clickPrompt) {
        console.error('[Error] Page wrapper or click prompt not found');
        return;
    }
    
    // The actual click handler is now in index.html
    // This function only sets up the initial state
    pageWrapper.style.opacity = '0';
    clickPrompt.classList.remove('hidden');
    
    // Track mouse movement for the shader
    document.addEventListener('mousemove', function(e) {
        if (typeof window.updateShaderMouse === 'function') {
            const x = e.clientX / window.innerWidth;
            const y = 1.0 - e.clientY / window.innerHeight; // Invert Y for shader coordinates
            window.updateShaderMouse(x, y);
        }
    });
}

// Set up the two-column layout
function setupTwoColumnLayout() {
    console.log('[Debug] Setting up two-column layout');
    
    // Generate profile section (full width)
    generateProfile();
    
    // Get column content containers
    const leftColumn = document.getElementById('left-column-content');
    const rightColumn = document.getElementById('right-column-content');
    
    if (!leftColumn || !rightColumn) {
        console.error('[Debug] Column containers not found');
        return;
    }
    
    // LEFT COLUMN: Creative Builds Section
    const creativeBuildsLinks = links.slice(0, 7); // First 7 links are creative builds
    createLinkSection('CREATIVE BUILDS', creativeBuildsLinks, leftColumn, 0);
    
    // RIGHT COLUMN: Services Section
    const serviceLinks = [
        // Featured services at the top
        links.find(link => link.title === "Development Services"),
        links.find(link => link.title === "Digital Consulting"),
        // Other services
        links.find(link => link.title === "Dev Portfolio"),
        links.find(link => link.title === "GitHub"),
        links.find(link => link.title === "Contact")
    ].filter(Boolean); // Filter out any undefined items
    
    createLinkSection('SERVICES', serviceLinks, rightColumn, 0);
    
    // RIGHT COLUMN: Marketplaces Section (NEW)
    const marketplacesLinks = [
        links.find(link => link.title === "Fiverr Profile"),
        {
            title: "Gumroad",
            url: "https://gumroad.com",
            icon: "🛒",
            description: "Digital products and premium design resources"
        },
        {
            title: "Envato Market",
            url: "https://codecanyon.net",
            icon: "🧩",
            description: "Premium templates and code components"
        },
        {
            title: "Creative Market",
            url: "https://creativemarket.com",
            icon: "🎨",
            description: "Design assets and creative resources"
        },
        {
            title: "Lemon Squeezy",
            url: "https://lemonsqueezy.com",
            icon: "🍋",
            description: "Digital products and SaaS solutions"
        }
    ].filter(Boolean);
    
    createLinkSection('MARKETPLACES', marketplacesLinks, rightColumn, 1);
    
    // LEFT COLUMN: Portfolio Section
    generatePortfolioSection(leftColumn);
    
    // RIGHT COLUMN: Testimonials Section
    generateTestimonialsSection(rightColumn);
}

// Generate the profile section
function generateProfile() {
    console.log('[Debug] Generating profile section');
    
    const profileHeader = document.querySelector('.profile-header');
    if (!profileHeader) return;
    
    const profile = document.createElement('div');
    profile.className = 'profile';
    profileHeader.appendChild(profile);
    
    profile.innerHTML = `
        <div class="profile-image-container">
            <div class="profile-image">
                <img src="assets/profilePicture.jpg" alt="Gabriel Cavazos">
            </div>
            <div class="profile-image-backdrop"></div>
        </div>
        <div class="status-badge">
            <i class="fas fa-circle" style="font-size: 0.6rem; margin-right: 5px; color: #00ff7b;"></i>
            Available for Work
        </div>
        <h1 class="profile-name">Gabriel Cavazos</h1>
        <p class="profile-bio">Premium Web Design & Development Services</p>
        <div class="profile-tagline">GigaCode: Crafting digital experiences that elevate your brand</div>
    `;
    
    // Add animations
    profile.setAttribute('data-aos', 'fade-up');
    
    // Add parallax effect to profile elements
    addProfileParallaxEffect();
}

// Add parallax effect to profile elements
function addProfileParallaxEffect() {
    const profileImage = document.querySelector('.profile-image');
    const profileBackdrop = document.querySelector('.profile-image-backdrop');
    
    if (profileImage && profileBackdrop) {
        // Add subtle glow to profile image on hover
        profileImage.addEventListener('mouseenter', () => {
            gsap.to(profileBackdrop, {
                width: '200px',
                height: '200px',
                opacity: 0.8,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        profileImage.addEventListener('mouseleave', () => {
            gsap.to(profileBackdrop, {
                width: '180px',
                height: '180px',
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }
}

// Generate left column content (Creative Builds and Portfolio)
function generateLeftColumnContent() {
    console.log('[Debug] Generating left column content');
    
    const leftColumnContent = document.getElementById('left-column-content');
    if (!leftColumnContent) return;
    
    // Generate Creative Builds section
    generateCreativeBuildsSection(leftColumnContent);
    
    // Generate Portfolio section
    generatePortfolioSection(leftColumnContent);
}

// Generate right column content (Services, Marketplaces, Testimonials)
function generateRightColumnContent() {
    console.log('[Debug] Generating right column content');
    
    const rightColumnContent = document.getElementById('right-column-content');
    if (!rightColumnContent) return;
    
    // Generate Services section
    generateServicesSection(rightColumnContent);
    
    // Generate Marketplaces section (new)
    generateMarketplacesSection(rightColumnContent);
    
    // Generate Testimonials section
    generateTestimonialsSection(rightColumnContent);
}

// Generate Creative Builds section
function generateCreativeBuildsSection(parentContainer) {
    console.log('[Debug] Generating Creative Builds section');
    
    // Creative Builds data
    const creativeBuilds = [
        {
            title: "reNamerX",
            url: "https://re-namer-x.vercel.app/",
            icon: "📂",
            description: "Powerful desktop batch file renaming application"
        },
        {
            title: "QuickToken Platform",
            url: "https://quick-token-platform.vercel.app/",
            icon: "🪙",
            description: "ERC-20 smart contract deployment platform with integrated DApp"
        },
        {
            title: "Tauri Security Boilerplate",
            url: "https://gcavazo1.github.io/tauri-security-boilerplate/",
            icon: "🔐",
            description: "Enterprise-ready security template for Tauri 2.0 desktop apps"
        },
        {
            title: "Neon Rush Game",
            url: "https://neon-rush-game.vercel.app/",
            icon: "🎮",
            description: "Web-based infinite scroller game with cyberpunk aesthetics"
        },
        {
            title: "Norma's Creations",
            url: "https://normascreations-landing.vercel.app/",
            icon: "🎀",
            description: "Handcrafted premium wreaths and seasonal decorations"
        },
        {
            title: "CogniCube AI",
            url: "https://cognicube-landing.vercel.app/",
            icon: "🧠",
            description: "Advanced AI solutions for enterprise applications"
        },
        {
            title: "MoonPups",
            url: "https://moonpups-landing.vercel.app/",
            icon: "🌙",
            description: "Creative digital experiences for pet enthusiasts"
        }
    ];
    
    // Create section
    const section = document.createElement('div');
    section.className = 'section creative-builds-section';
    section.setAttribute('data-aos', 'fade-up');
    
    // Create section header
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    sectionHeader.innerHTML = `
        <h2 class="section-title">CREATIVE BUILDS</h2>
        <div class="section-divider"></div>
    `;
    section.appendChild(sectionHeader);
    
    // Create links container
    const linksContainer = document.createElement('div');
    linksContainer.className = 'links-container';
    section.appendChild(linksContainer);
    
    // Add links to container
    creativeBuilds.forEach((link, index) => {
        const linkItem = createLinkItem(link, index);
        linksContainer.appendChild(linkItem);
    });
    
    // Add to parent container
    parentContainer.appendChild(section);
}

// Generate Services section
function generateServicesSection(parentContainer) {
    console.log('[Debug] Generating Services section');
    
    // Services data
    const services = [
        {
            title: "Development Services",
            url: "#",
            icon: "💻",
            description: "Custom web development for discerning businesses",
            featured: true,
            modal: true
        },
        {
            title: "Digital Consulting",
            url: "/consulting.html",
            icon: "📊",
            description: "Strategic digital presence consulting for businesses",
            featured: true
        },
        {
            title: "Dev Portfolio",
            url: "https://gcavazo1.github.io/GigaCode_Dev_Showcase_Website/",
            icon: "🔍",
            description: "View my professional development portfolio"
        },
        {
            title: "GitHub",
            url: "https://github.com/Gcavazo1",
            icon: "♦️",
            description: "Check out my open source projects and contributions"
        },
        {
            title: "Contact",
            url: "/contact.html",
            icon: "✉️",
            description: "Get in touch for project inquiries and collaborations"
        }
    ];
    
    // Create section
    const section = document.createElement('div');
    section.className = 'section services-section';
    section.setAttribute('data-aos', 'fade-up');
    
    // Create section header
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    sectionHeader.innerHTML = `
        <h2 class="section-title">SERVICES</h2>
        <div class="section-divider"></div>
    `;
    section.appendChild(sectionHeader);
    
    // Create links container
    const linksContainer = document.createElement('div');
    linksContainer.className = 'links-container';
    section.appendChild(linksContainer);
    
    // Add links to container
    services.forEach((link, index) => {
        const linkItem = createLinkItem(link, index);
        linksContainer.appendChild(linkItem);
    });
    
    // Add to parent container
    parentContainer.appendChild(section);
}

// Generate new Marketplaces section
function generateMarketplacesSection(parentContainer) {
    console.log('[Debug] Generating Marketplaces section');
    
    // Marketplaces data
    const marketplaces = [
        {
            title: "Fiverr Profile",
            url: "https://www.fiverr.com/s/6Y217ER",
            icon: "⭐",
            description: "Hire me for premium web development and design services"
        },
        {
            title: "Gumroad",
            url: "https://gumroad.com",
            icon: "🛒",
            description: "Digital products and premium design resources"
        },
        {
            title: "Envato Market",
            url: "https://codecanyon.net",
            icon: "🧩",
            description: "Premium templates and code components"
        },
        {
            title: "Creative Market",
            url: "https://creativemarket.com",
            icon: "🎨",
            description: "Design assets and creative resources"
        },
        {
            title: "Lemon Squeezy",
            url: "https://lemonsqueezy.com",
            icon: "🍋",
            description: "Digital products and SaaS solutions"
        }
    ];
    
    // Create section
    const section = document.createElement('div');
    section.className = 'section marketplaces-section';
    section.setAttribute('data-aos', 'fade-up');
    section.setAttribute('data-aos-delay', '100');
    
    // Create section header
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    sectionHeader.innerHTML = `
        <h2 class="section-title">MARKETPLACES</h2>
        <div class="section-divider"></div>
    `;
    section.appendChild(sectionHeader);
    
    // Create links container
    const linksContainer = document.createElement('div');
    linksContainer.className = 'links-container';
    section.appendChild(linksContainer);
    
    // Add links to container
    marketplaces.forEach((link, index) => {
        const linkItem = createLinkItem(link, index);
        linksContainer.appendChild(linkItem);
    });
    
    // Add to parent container
    parentContainer.appendChild(section);
}

// Generate Testimonials section
function generateTestimonialsSection(parentContainer) {
    console.log('[Debug] Generating Testimonials section');
    
    // Create section
    const section = document.createElement('div');
    section.className = 'section testimonials-section';
    section.setAttribute('data-aos', 'fade-up');
    section.setAttribute('data-aos-delay', '200');
    
    // Create section header
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    sectionHeader.innerHTML = `
        <h2 class="section-title">CLIENT TESTIMONIALS</h2>
        <div class="section-divider"></div>
    `;
    section.appendChild(sectionHeader);
    
    // Testimonials data
    const testimonials = [
        {
            quote: "Working with this designer was transformative for our brand. The attention to detail and premium aesthetic elevated our digital presence beyond expectations.",
            name: "Sarah Johnson",
            company: "Luxury Interiors Co.",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            quote: "The level of sophistication and technical excellence delivered was exceptional. Our conversion rates have increased by 40% since the redesign.",
            name: "Michael Chen",
            company: "Prestige Ventures",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            quote: "A true artisan of digital design. The custom animations and attention to brand positioning created a website that perfectly captures our premium offering.",
            name: "Elizabeth Taylor",
            company: "Elite Boutique",
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        }
    ];
    
    // Create testimonials container
    const testimonialsContainer = document.createElement('div');
    testimonialsContainer.className = 'testimonials-container';
    
    // Add testimonials
    testimonials.forEach((testimonial, index) => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.setAttribute('data-aos', 'fade-up');
        testimonialCard.setAttribute('data-aos-delay', `${index * 100}`);
        
        testimonialCard.innerHTML = `
            <div class="testimonial-quote">"${testimonial.quote}"</div>
            <div class="testimonial-author">
                <div class="testimonial-author-image">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                </div>
                <div class="testimonial-author-info">
                    <div class="testimonial-author-name">${testimonial.name}</div>
                    <div class="testimonial-author-company">${testimonial.company}</div>
                </div>
            </div>
        `;
        
        testimonialsContainer.appendChild(testimonialCard);
    });
    
    section.appendChild(testimonialsContainer);
    
    // Add to parent container
    parentContainer.appendChild(section);
}

// Generate Portfolio section with categories
function generatePortfolioSection(parentContainer) {
    console.log('[Debug] Generating portfolio section');
    
    // Create section
    const section = document.createElement('div');
    section.className = 'section portfolio-section';
    section.setAttribute('data-aos', 'fade-up');
    section.setAttribute('data-aos-delay', '100');
    
    // Create section header
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    sectionHeader.innerHTML = `
        <h2 class="section-title">PORTFOLIO HIGHLIGHTS</h2>
        <div class="section-divider"></div>
    `;
    section.appendChild(sectionHeader);
    
    // Create category tabs
    const categoryTabs = document.createElement('div');
    categoryTabs.className = 'category-tabs';
    categoryTabs.innerHTML = `
        <button class="category-tab active" data-category="all">All Projects</button>
        <button class="category-tab" data-category="app">Desktop Apps</button>
        <button class="category-tab" data-category="web">Web Projects</button>
        <button class="category-tab" data-category="blockchain">Blockchain</button>
        <button class="category-tab" data-category="templates">Templates</button>
    `;
    section.appendChild(categoryTabs);
    
    const portfolioGrid = document.createElement('div');
    portfolioGrid.className = 'portfolio-grid';
    
    // Portfolio items
    const portfolioItems = [
        {
            title: "reNamerX",
            description: "Cross-platform batch file renaming desktop application",
            image: "assets/renamex-preview.jpg",
            url: "https://re-namer-x.vercel.app/",
            category: "app"
        },
        {
            title: "QuickToken Platform",
            description: "Full DApp with ERC-20 token deployment capabilities",
            image: "assets/quicktoken-preview.jpg",
            url: "https://quick-token-platform.vercel.app/",
            category: "blockchain"
        },
        {
            title: "Tauri Security Boilerplate",
            description: "Enterprise-grade security template for Tauri desktop apps",
            image: "assets/tauri-security-preview.jpg",
            url: "https://gcavazo1.github.io/tauri-security-boilerplate/",
            category: "templates"
        },
        {
            title: "Neon Rush Game",
            description: "Infinite scroller game with cyberpunk aesthetics",
            image: "assets/neon-rush-preview.jpg",
            url: "https://neon-rush-game.vercel.app/",
            category: "web"
        },
        {
            title: "Norma's Creations",
            description: "Premium handcrafted wreaths and seasonal decorations",
            image: "assets/normas-creations-preview.jpg",
            url: "https://normascreations-landing.vercel.app/",
            category: "web"
        },
        {
            title: "CogniCube AI",
            description: "Enterprise AI solution with advanced analytics dashboard",
            image: "assets/cognicube-preview.jpg",
            url: "https://cognicube-landing.vercel.app/",
            category: "web"
        },
        {
            title: "MoonPups",
            description: "Creative digital platform for pet enthusiasts",
            image: "assets/moonpups-preview.jpg",
            url: "https://moonpups-landing.vercel.app/",
            category: "web"
        }
    ];
    
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('a');
        portfolioItem.href = item.url;
        portfolioItem.target = "_blank";
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-category', item.category);
        portfolioItem.setAttribute('data-aos', 'fade-up');
        portfolioItem.setAttribute('data-aos-delay', `${index * 100}`);
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <div class="portfolio-overlay-content">
                        <div class="portfolio-category">${getCategoryLabel(item.category)}</div>
                        <div class="view-project">View Project</div>
                    </div>
                </div>
            </div>
            <div class="portfolio-details">
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-description">${item.description}</p>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
    
    section.appendChild(portfolioGrid);
    
    // Add to parent container
    parentContainer.appendChild(section);
    
    // Add category filtering functionality
    setupCategoryTabs();
}

// Helper function to create a link item
function createLinkItem(link, index) {
    const linkItem = document.createElement('a');
    linkItem.href = link.url;
    linkItem.className = 'link-item';
    
    // Add featured class if the link is featured
    if (link.featured) {
        linkItem.classList.add('featured');
    }
    
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
    
    // Add featured star indicator if it's a featured link
    if (link.featured) {
        const featuredStar = document.createElement('div');
        featuredStar.className = 'featured-star';
        featuredStar.innerHTML = '★';
        linkItem.appendChild(featuredStar);
    }
    
    textContainer.appendChild(title);
    textContainer.appendChild(description);
    
    linkItem.appendChild(icon);
    linkItem.appendChild(textContainer);
    linkItem.appendChild(arrow);
    
    // Add hover effects for premium feel
    linkItem.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });
    
    linkItem.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });
    
    return linkItem;
}

// Helper function to get readable category label
function getCategoryLabel(category) {
    const labels = {
        'app': 'Desktop App',
        'web': 'Web Project',
        'blockchain': 'Blockchain',
        'templates': 'Template'
    };
    return labels[category] || 'Project';
}

// Setup category tabs functionality
function setupCategoryTabs() {
    console.log('[Debug] Setting up category tabs');
    
    const tabs = document.querySelectorAll('.category-tab');
    if (!tabs.length) return;
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (!portfolioItems.length) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    gsap.to(item, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out", display: 'block' });
                } else {
                    gsap.to(item, { opacity: 0, scale: 0.95, duration: 0.4, ease: "power2.out", display: 'none' });
                }
            });
        });
    });
}

// Setup animations
function setupAnimations() {
    console.log('[Debug] Setting up animations');
    
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 50
    });
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