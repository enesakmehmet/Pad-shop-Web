// Performance Optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Defer non-critical CSS
    const loadDeferredStyles = () => {
        document.querySelectorAll('link[data-defer]').forEach(link => {
            link.setAttribute('rel', 'stylesheet');
            link.removeAttribute('data-defer');
        });
    };

    // Load deferred styles after page load
    if (window.requestIdleCallback) {
        requestIdleCallback(loadDeferredStyles);
    } else {
        setTimeout(loadDeferredStyles, 0);
    }

    // Cache DOM elements
    const cachedElements = new Map();
    const getElement = (selector) => {
        if (!cachedElements.has(selector)) {
            cachedElements.set(selector, document.querySelector(selector));
        }
        return cachedElements.get(selector);
    };

    // Debounce function for performance
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Optimize scroll events
    const optimizedScroll = debounce(() => {
        // Your scroll handling code
    }, 16);

    window.addEventListener('scroll', optimizedScroll, { passive: true });

    // Preconnect to required origins
    const preconnectOrigins = [
        'https://cdn.jsdelivr.net',
        'https://cdnjs.cloudflare.com',
        'https://maps.googleapis.com'
    ];

    preconnectOrigins.forEach(origin => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = origin;
        document.head.appendChild(link);
    });

    // Initialize image lazy loading for dynamic content
    const initializeLazyLoading = () => {
        const newImages = document.querySelectorAll('img:not([data-src])');
        newImages.forEach(img => {
            if (!img.dataset.src) {
                img.dataset.src = img.src;
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                imageObserver.observe(img);
            }
        });
    };

    // Performance monitoring
    if ('performance' in window && 'PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                }
                if (entry.entryType === 'first-input') {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
            });
        });

        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
    }

    // Resource hint optimization
    const addResourceHint = (url, type = 'preload') => {
        const link = document.createElement('link');
        link.rel = type;
        link.href = url;
        if (type === 'preload') {
            link.as = url.endsWith('.js') ? 'script' : 
                     url.endsWith('.css') ? 'style' : 
                     'image';
        }
        document.head.appendChild(link);
    };

    // Optimize third-party resources
    const optimizeThirdParty = () => {
        // Load non-critical third-party scripts after page load
        setTimeout(() => {
            // Add your third-party scripts here
        }, 2000);
    };

    // Initialize performance optimizations
    const init = () => {
        initializeLazyLoading();
        optimizeThirdParty();
    };

    init();
});
