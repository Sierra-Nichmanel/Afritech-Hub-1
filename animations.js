/**
 * Premium Scroll Animations
 * Uses Intersection Observer for high-performance scroll reveals.
 */

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                
                // Handle counter animation if it's a stat block or contains stat numbers
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(num => {
                    if (!num.classList.contains('counted')) {
                        animateValue(num);
                    }
                });

                // Optional: stop observing after reveal for performance
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    function animateValue(obj) {
        const startValue = 0;
        const endValue = parseInt(obj.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime >= duration) {
                obj.textContent = endValue;
                obj.classList.add('counted');
                return;
            }

            const progress = elapsedTime / duration;
            // Ease out quad
            const easedProgress = 1 - (1 - progress) * (1 - progress);
            const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
            
            obj.textContent = currentValue;
            requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    // Initial reveal for elements already in view
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale');
    
    revealElements.forEach((el, index) => {
        // Handle staggered children if high-level container has .stagger-children
        if (el.classList.contains('stagger-children')) {
            const children = el.children;
            Array.from(children).forEach((child, i) => {
                child.style.transitionDelay = `${i * 0.15}s`;
                child.classList.add('reveal-child');
            });
        }
        
        observer.observe(el);
    });
});
