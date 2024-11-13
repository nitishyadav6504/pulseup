// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    smartphone: { smooth: true },
    tablet: { smooth: true }
});

// Custom Cursor with better performance
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

    requestAnimationFrame(updateCursor);
}

updateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .work-item');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(1.5)`;
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(1.5)`;
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(1)`;
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(1)`;
    });
});

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const progress = document.querySelector('.loading-progress');
    let width = 0;
    
    const interval = setInterval(() => {
        width += 1;
        progress.style.width = `${width}%`;
        
        if (width >= 100) {
            clearInterval(interval);
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                initAnimations();
            }, 500);
        }
    }, 20);
});

// Initialize animations after loading
function initAnimations() {
    gsap.from('.hero-text h1', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });

    gsap.from('.hero-text p', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
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
    follower.style.transition = 'none';
});

// Refresh Locomotive Scroll on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        scroll.update();
    }, 250);
});

// Magnetic button effect
document.querySelectorAll('.magnetic-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) * 0.2;
        const deltaY = (y - centerY) * 0.2;
        
        button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Enhanced scroll animations
scroll.on('scroll', (args) => {
    // Parallax for hero section
    const hero = document.querySelector('.hero');
    const scrolled = args.scroll.y;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    
    // Fade out hero content based on scroll
    const heroContent = document.querySelector('.hero-text');
    heroContent.style.opacity = 1 - (scrolled * 0.002);
});

// Add smooth reveal for work items
gsap.utils.toArray('.work-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "top center",
            scrub: 1
        },
        y: 100,
        opacity: 0
    });
});
