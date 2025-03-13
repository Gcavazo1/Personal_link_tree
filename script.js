// Link data - customize with your own links
const links = [
    {
        title: "Design Portfolio",
        url: "#",
        icon: "✦",
        description: "Explore my premium web design projects & case studies"
    },
    {
        title: "Development Services",
        url: "#",
        icon: "⟡",
        description: "Custom web development for discerning businesses"
    },
    {
        title: "Luxury Web Design",
        url: "#",
        icon: "◈",
        description: "Bespoke website designs for high-end brands & services"
    },
    {
        title: "Client Showcase",
        url: "#",
        icon: "✧",
        description: "Success stories and testimonials from select clients"
    },
    {
        title: "Digital Consulting",
        url: "#",
        icon: "◎",
        description: "Strategic digital presence consulting for businesses"
    },
    {
        title: "Schedule Consultation",
        url: "#",
        icon: "⧉",
        description: "Book a discovery call to discuss your premium project"
    },
    {
        title: "Contact",
        url: "mailto:your.email@example.com",
        icon: "✉",
        description: "Inquire about availability for select projects"
    }
];

// Services offered - more premium and specific
const services = [
    "Luxury Web Design",
    "Custom Development",
    "Digital Branding",
    "UI/UX Design",
    "E-commerce",
    "Art Direction"
];

// DOM elements
const linksContainer = document.querySelector('.links');
const profile = document.querySelector('.profile');
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

// Initialize smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Custom cursor implementation
function setupCustomCursor() {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power1.out'
        });
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    // Handle cursor behavior on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .link-item, .canvas-container');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            cursorFollower.classList.add('follower-active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            cursorFollower.classList.remove('follower-active');
        });
    });
}

// Generate link elements
function generateLinks() {
    links.forEach((link, index) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.className = 'link-item';
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
        
        // Create link content with icon, title and description
        linkElement.innerHTML = `
            <div class="link-icon">${link.icon}</div>
            <div class="link-content">
                <div class="link-title">
                    ${link.title}
                    <span class="link-arrow">→</span>
                </div>
                ${link.description ? `<div class="link-description">${link.description}</div>` : ''}
            </div>
        `;
        
        linksContainer.appendChild(linkElement);
    });
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

// Add animations using GSAP
function setupAnimations() {
    console.log('[Debug] Setting up animations');
    
    // Profile animation - more subtle and elegant
    gsap.fromTo(profile, {
        opacity: 0,
        y: -20
    }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
    });

    // Categories animation with slight delay
    const categories = document.querySelectorAll('.category');
    gsap.fromTo(categories, {
        opacity: 0,
        y: 10,
        scale: 0.95
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.05,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.4
    });

    // Staggered animation for links with more pronounced staggering
    const linkItems = document.querySelectorAll('.link-item');
    gsap.fromTo(linkItems, {
        opacity: 0,
        y: 20,
        scale: 0.98
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.6
    });
    
    // Footer fade in animation
    const footer = document.querySelector('.footer');
    if (footer) {
        gsap.fromTo(footer, {
            opacity: 0,
            y: 10
        }, {
            opacity: 0.7,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 1.4
        });
    }
    
    // Status badge animation
    const statusBadge = document.querySelector('.status-badge');
    if (statusBadge) {
        gsap.fromTo(statusBadge, {
            opacity: 0,
            scale: 0.8,
            y: 10
        }, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.5)",
            delay: 1
        });
    }
}

// Make setupAnimations globally available for shaders.js
window.setupAnimations = setupAnimations;

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

// Initialize the page
function init() {
    console.log('[Debug] Initializing page');
    generateLinks();
    generateServiceCategories();
    createFooter();
    handleMouseInteraction();
    setupCustomCursor();
    
    // Add direct click handler for the click prompt
    const clickPrompt = document.getElementById('click-prompt');
    if (clickPrompt) {
        clickPrompt.addEventListener('click', function(e) {
            console.log('[Debug] Click prompt clicked directly');
            if (window.revealContent && !document.body.classList.contains('content-visible')) {
                const x = (e.clientX / window.innerWidth) * 2 - 1;
                const y = -(e.clientY / window.innerHeight) * 2 + 1;
                window.revealContent(x, y);
                
                // Ensure the click prompt is removed
                setTimeout(() => {
                    if (this.parentNode) {
                        this.parentNode.removeChild(this);
                        console.log('[Debug] Click prompt removed after direct click');
                    }
                }, 500);
            }
        });
    }
    
    // Add direct click handler for canvas container as a fallback
    const canvasContainer = document.querySelector('.canvas-container');
    if (canvasContainer) {
        canvasContainer.addEventListener('click', function(e) {
            console.log('[Debug] Canvas container clicked directly');
            if (window.revealContent && !document.body.classList.contains('content-visible')) {
                const x = (e.clientX / window.innerWidth) * 2 - 1;
                const y = -(e.clientY / window.innerHeight) * 2 + 1;
                window.revealContent(x, y);
            }
        });
    }
    
    // Add document-wide click handler as a final fallback
    document.addEventListener('click', function(e) {
        console.log('[Debug] Document clicked');
        if (window.revealContent && !document.body.classList.contains('content-visible')) {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            window.revealContent(x, y);
        }
        
        // Force remove click prompt if it still exists after clicking
        const clickPrompt = document.querySelector('.click-prompt');
        if (clickPrompt && document.body.classList.contains('content-visible')) {
            clickPrompt.remove();
            console.log('[Debug] Forcibly removed click prompt');
        }
    });
    
    // Note: setupAnimations is now called by shader.js after reveal effect
}

// Initialize everything when the page loads
window.addEventListener('load', init); 