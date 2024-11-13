// Loader Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const progress = document.querySelector('.progress');
    
    let width = 0;
    const interval = setInterval(() => {
        width += 1;
        progress.style.width = width + '%';
        if (width >= 100) {
            clearInterval(interval);
            gsap.to(loader, {
                opacity: 0,
                duration: 1,
                onComplete: () => loader.style.display = 'none'
            });
        }
    }, 20);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-content h1', {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.5
});

gsap.from('.hero-content p', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.8
});

// Work Items Animation
document.querySelectorAll('.work-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});
