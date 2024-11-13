// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    smartphone: { smooth: true },
    tablet: { smooth: true }
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Cursor hover effect for clickable elements
const hoverElements = document.querySelectorAll('a, button, .work-item');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Loading Screen Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    const loadingCount = document.querySelector('.loading-count');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        loadingCount.textContent = `${Math.round(progress)}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Start page animations
                    initPageAnimations();
                }, 1000);
            }, 500);
        }
    }, 100);
});

// Initialize Page Animations
function initPageAnimations() {
    // Hero Section Animation
    gsap.from('.hero-text h1', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
    });
    
    gsap.from('.hero-text p', {
        y: 50,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'power4.out'
    });
    
    gsap.from('.scroll-indicator', {
        y: 50,
        opacity: 0,
        duration: 1.5,
        delay: 1,
        ease: 'power4.out'
    });
}

// Scroll Animations
scroll.on('scroll', (args) => {
    // Parallax effect for work items
    document.querySelectorAll('.work-item').forEach((item) => {
        const speed = item.getAttribute('data-scroll-speed') || -2;
        const progress = args.scroll.y - item.offsetTop;
        item.style.transform = `translateY(${progress * speed}px)`;
    });
});

// Work Items Hover Effect
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item.querySelector('img'), {
            scale: 1.1,
            duration: 0.8,
            ease: 'power4.out'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item.querySelector('img'), {
            scale: 1,
            duration: 0.8,
            ease: 'power4.out'
        });
    });
});

// Form Animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(element => {
    element.addEventListener('focus', function() {
        gsap.to(this.nextElementSibling, {
            y: -20,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        gsap.to(this.nextElementSibling.nextElementSibling, {
            width: '100%',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    element.addEventListener('blur', function() {
        if (this.value === '') {
            gsap.to(this.nextElementSibling, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
        
        gsap.to(this.nextElementSibling.nextElementSibling, {
            width: '0%',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        scroll.scrollTo(target);
    });
});

// Navigation Background Change on Scroll
scroll.on('scroll', (args) => {
    const nav = document.querySelector('nav');
    if (args.scroll.y > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.9)';
    } else {
        nav.style.background = 'transparent';
    }
});

// Form Submission Handler
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const button = this.querySelector('button');
    const originalText = button.innerHTML;
    
    // Animation for button
    button.innerHTML = 'Sending...';
    button.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        button.innerHTML = 'Message Sent!';
        this.reset();
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }, 1500);
});

// Update cursor on window resize
window.addEventListener('resize', () => {
    cursor.style.transition = 'none';
    cursorFollower.style.transition = 'none';
});

// Refresh Locomotive Scroll on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        scroll.update();
    }, 250);
});
