/**
 * Premium Scroll Animations
 * Uses Intersection Observer for high-performance scroll reveals.
 */

/**
 * Premium Scroll Animations
 * Uses Intersection Observer for high-performance scroll reveals.
 */

function initAnimations() {
    // -------------------------------------------------------------
    // 1. Dynamic Per-Page Animation Injection
    // -------------------------------------------------------------
    const currentPath = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
    
    // Select semantic tags to animate
    const animatableElements = document.querySelectorAll('section > div > h1, section > div > h2, section > div > h3, section > div > p, article, .team-card, .value-card');
    const containerElements = document.querySelectorAll('.grid'); 
    
    animatableElements.forEach(el => {
        if (el.dataset.revealed) return;
        el.classList.add('reveal-base');
        
        if (currentPath.includes('index.html') || currentPath.includes('hub-1') || currentPath === '/') {
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
            el.classList.add('reveal-up');
        }
        el.dataset.revealed = "true";
    });

    containerElements.forEach(grid => {
        if (!grid.classList.contains('stagger-children')) {
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                
                // Trigger counters
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(num => {
                    if (!num.classList.contains('counted')) {
                        animateValue(num);
                    }
                });
                
                if (entry.target.classList.contains('stat-number') && !entry.target.classList.contains('counted')) {
                     animateValue(entry.target);
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // -------------------------------------------------------------
    // 3. Counter Animation Logic
    // -------------------------------------------------------------
    function animateValue(obj) {
        if (obj.classList.contains('counting')) return;
        obj.classList.add('counting');

        const endValueStr = obj.getAttribute('data-count');
        if (!endValueStr) return;
        
        const endValue = parseInt(endValueStr.replace(/[^\d]/g, ''), 10);
        const suffix = obj.getAttribute('data-suffix') || '';
        const duration = 2000; 
        const startTime = performance.now();

        function update(currentTime) {
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime >= duration) {
                obj.textContent = endValue.toLocaleString() + suffix;
                obj.classList.add('counted');
                obj.classList.remove('counting');
                return;
            }

            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(endValue * easedProgress);
            
            obj.textContent = currentValue.toLocaleString() + suffix;
            requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    // -------------------------------------------------------------
    // 4. Initialize
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-base, .stagger-children, .stat-number');
    revealElements.forEach(el => observer.observe(el));
}

// Support both standard scripts and modules
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

