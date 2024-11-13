// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Loader Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const progress = document.querySelector('.progress');
    let loadProgress = 0;

    const interval = setInterval(() => {
        loadProgress += 1;
        progress.style.width = `${loadProgress}%`;
        
        if (loadProgress >= 100) {
            clearInterval(interval);
            
            // Fade out loader
            gsap.to(loader, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    loader.style.display = 'none';
                    // Start page animations
                    initPageAnimations();
                }
            });
        }
    }, 20);
});

function initPageAnimations() {
    // Hero Section Animation
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .to('.hero-content h1', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .to('.hero-content p', {
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.location-badge', {
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5');

    // Work Items Animation
    document.querySelectorAll('.work-item').forEach((item, index) => {
        gsap.set(item, { opacity: 0, y: 50 });
        
        ScrollTrigger.create({
            trigger: item,
            start: 'top center+=100',
            onEnter: () => {
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: 'power3.inOut'
            });
        }
    });
});
