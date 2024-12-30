// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in-up class to elements you want to animate
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const cards = document.querySelectorAll('.card');
    const sections = document.querySelectorAll('section');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    // Add fade-in-up class and observe elements
    [...cards, ...sections, ...testimonials].forEach(element => {
        element.classList.add('fade-in-up');
        observer.observe(element);
    });

    // Initialize special items
    const products = document.querySelectorAll('.product-card');
    products.forEach((product, index) => {
        if (index % 5 === 0) { // Make every 5th product special
            product.classList.add('special-item');
        }
    });

    // Add floating animation to price tags
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.classList.add('price-tag');
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effect to navigation
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
        });
        item.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add parallax effect to background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('animate-fade-in');
        img.style.opacity = '0';
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');
    
    const rippleContainer = document.createElement('span');
    rippleContainer.classList.add('ripple-container');
    
    rippleContainer.appendChild(ripple);
    button.appendChild(rippleContainer);
    
    setTimeout(() => {
        rippleContainer.remove();
    }, 1000);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});
