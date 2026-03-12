/**
 * Premium Scroll Animations
 * Uses Intersection Observer for high-performance scroll reveals.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------------------
    // 1. Dynamic Per-Page Animation Injection
    // Assigns different default entrance animations based on the page
    // -------------------------------------------------------------
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Select semantic tags to animate
    const animatableElements = document.querySelectorAll('section > div > h1, section > div > h2, section > div > h3, section > div > p, article, .team-card, .value-card');
    const containerElements = document.querySelectorAll('.grid'); // Automatically stagger grids
    
    // Apply varied global animations based on the page context
    animatableElements.forEach(el => {
        // Prevent overriding elements that already have specific animations defined in HTML
        if (el.className.includes('reveal-')) return;
        
        el.classList.add('reveal-base');
        
        if (currentPath.includes('index.html') || currentPath === '') {
            el.classList.add('reveal-up');
        } else if (currentPath.includes('about.html')) {
            el.classList.add('reveal-blur-up');
        } else if (currentPath.includes('services.html')) {
            el.classList.add('reveal-flip-up');
        } else if (currentPath.includes('products.html')) {
            el.classList.add('reveal-scale-in');
        } else if (currentPath.includes('enterprise.html')) {
            el.classList.add('reveal-left');
        } else {
            // Default fallback for other pages (Contact, Training, Blog, Case Studies)
            el.classList.add('reveal-up');
        }
    });

    // Automatically make grids staggered children
    containerElements.forEach(grid => {
        if (!grid.className.includes('stagger-children')) {
            grid.classList.add('stagger-children');
            if (currentPath.includes('about.html')) {
                 grid.classList.add('reveal-blur-up');
            } else if (currentPath.includes('services.html')) {
                 grid.classList.add('reveal-flip-up');
            } else {
                 grid.classList.add('reveal-up');
            }
        }
    });


    // -------------------------------------------------------------
    // 2. Intersection Observer Setup
    // -------------------------------------------------------------
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                
                // Handle counter animation if it's a stat block or contains stat numbers
                // We find all stat numbers inside this newly revealed container
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(num => {
                    if (!num.classList.contains('counted')) {
                        animateValue(num);
                    }
                });
                
                // If the target itself is a stat number (in case it wasn't wrapped)
                if (entry.target.classList.contains('stat-number') && !entry.target.classList.contains('counted')) {
                     animateValue(entry.target);
                }

                // Stop observing after reveal for better performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);


    // -------------------------------------------------------------
    // 3. Counter Animation Logic
    // -------------------------------------------------------------
    function animateValue(obj) {
        const startValue = 0;
        const endValueStr = obj.getAttribute('data-count');
        
        // If there's no data-count, we can't animate it
        if (!endValueStr) return;
        
        const endValue = parseInt(endValueStr.replace(/,/g, ''), 10);
        const suffix = obj.getAttribute('data-suffix') || '';
        const duration = 2500; // Premium 2.5s duration
        const startTime = performance.now();

        function update(currentTime) {
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime >= duration) {
                obj.textContent = endValue.toLocaleString() + suffix;
                obj.classList.add('counted');
                return;
            }

            const progress = elapsedTime / duration;
            // Ease out exponential for a fast start and slow satisfying finish
            const easedProgress = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
            
            obj.textContent = currentValue.toLocaleString() + suffix;
            requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    // -------------------------------------------------------------
    // 4. Initialize Elements
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-base, .stagger-children, .stat-number');
    
    revealElements.forEach((el) => {
        // Prepare staggered children styling
        if (el.classList.contains('stagger-children')) {
            const children = el.children;
            Array.from(children).forEach((child, i) => {
                child.style.transitionDelay = `${(i * 0.08) + 0.05}s`;
                child.classList.add('reveal-child');
            });
        }
        
        // Use requestAnimationFrame to ensure immediate check doesn't block main thread
        requestAnimationFrame(() => {
            observer.observe(el);
        });
    });
});
