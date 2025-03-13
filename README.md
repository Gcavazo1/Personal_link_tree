# Professional Freelance Link Tree

A premium, ultra-modern link tree for freelance web designers and developers. Features include a stunning GLSL shader background, click-to-reveal animation, and smooth transitions that give potential clients a memorable first impression.

![Preview](preview.jpg) <!-- You'll need to add your own preview image -->

## Features

- 🌙 Elegant dark mode UI with a professional aesthetic
- ✨ Interactive GLSL shader background with click-to-reveal effect
- 🎭 Ultra-smooth animations using GSAP
- 📱 Fully responsive and mobile-optimized design
- 🔗 Structured links with descriptions for freelance platforms
- 🌊 Premium microinteractions and hover effects
- 🚀 Lightweight and fast-loading

## Customization for Your Freelance Business

### 1. Update Your Profile Information

Edit the profile section in `index.html`:

```html
<div class="profile">
    <div class="profile-image">
        <!-- Replace with your profile image -->
        <img src="your-profile-image.jpg" alt="Your Name">
    </div>
    <h1>Your Name</h1>
    <div class="profession">Web Designer & Developer</div>
    <p class="bio">Your professional bio here...</p>
</div>
```

### 2. Update Your Service Offerings

Edit the services array in `script.js`:

```javascript
const services = [
    "Web Design",
    "Web Development",
    "UI/UX Design",
    "Responsive Design",
    "E-commerce",
    "WordPress"
];
```

### 3. Update Your Professional Links

Edit the links array in `script.js` to point to your freelance profiles:

```javascript
const links = [
    {
        title: "Fiverr",
        url: "https://fiverr.com/your-profile",
        icon: "🌟",
        description: "Professional web design & development services"
    },
    // Add your other professional profiles
];
```

### 4. Customize Colors and Branding

Modify the color variables in the `:root` section of `styles.css`:

```css
:root {
    --bg-primary: #121212;
    --bg-secondary: #1A1A1A;
    --text-primary: #E0E0E0;
    --text-secondary: #B0B0B0;
    --text-highlight: #FFFFFF;
    --accent: #00ADB5; /* Change to match your personal brand */
}
```

## Deployment Options for Freelancers

### 1. GitHub Pages (Free)

1. Create a GitHub repository
2. Upload your link tree files
3. Go to repository settings > Pages
4. Select your main branch and click save
5. Your site will be live at `https://yourusername.github.io/repository-name`

### 2. Netlify (Free)

1. Create a Netlify account
2. Drag and drop your project folder to Netlify
3. Your site will be live with a Netlify subdomain
4. You can connect a custom domain in the site settings

### 3. Vercel (Free)

1. Create a Vercel account
2. Import your project from GitHub or upload directly
3. Your site will be live instantly with a Vercel subdomain
4. You can connect a custom domain in the project settings

### 4. Custom Domain (Recommended for Professionals)

Purchase a domain from Namecheap, GoDaddy, or Google Domains and connect it to your deployment option. A custom domain like `yourname.com` or `yourname.design` looks more professional to potential clients.

## Using This Link Tree Effectively for Freelancing

1. **Include Client Testimonials**: Consider adding a subtle testimonial section to build trust
2. **Add a Call-to-Action**: Make it clear what you want potential clients to do
3. **Feature Recent Work**: Include links to your best and most recent projects
4. **Track Analytics**: Add Google Analytics or a similar tool to track visitor behavior
5. **Update Regularly**: Keep your links and project portfolio updated

## Libraries Used

- [GSAP](https://greensock.com/gsap/) - For professional animations
- [Lenis](https://lenis.studiofreight.com/) - For smooth scrolling
- [Three.js](https://threejs.org/) - For GLSL shader implementation

## License

This project is MIT licensed.

---

Made with ❤️ for freelancers who want to stand out from the crowd 