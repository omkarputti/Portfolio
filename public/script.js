// script.js

// Smooth scrolling for navigation links
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

// Navigation active state
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    setTimeout(() => {
        alert('Message sent successfully! I will get back to you soon.');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Add loading animation to hire buttons
document.querySelectorAll('.hire-btn, .btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#contact') {
            return;
        }
        e.preventDefault();
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.style.pointerEvents = 'none';
        setTimeout(() => {
            this.textContent = originalText;
            this.style.pointerEvents = 'auto';
        }, 1000);
    });
});

// Animate stats on scroll
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = finalValue / 30;
                const updateCounter = () => {
                    if (currentValue < finalValue) {
                        currentValue += increment;
                        target.textContent = Math.floor(currentValue) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = finalValue + '+';
                    }
                };
                updateCounter();
                observer.unobserve(target);
            }
        });
    });
    stats.forEach(stat => observer.observe(stat));
};
document.addEventListener('DOMContentLoaded', animateStats);

// Add hover effect to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px) scale(1)';
        }, 100);
    });
});

// Parallax effect for background shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect to hero title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    const typing = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    };
    typing();
};
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h2');
    if (heroTitle) {
        typeWriter(heroTitle, 'OMKAR PUTTI', 150);
    }
});

// Add mobile menu toggle (basic implementation)
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '☰';
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        @media (max-width: 768px) {
            display: block;
        }
    `;
    nav.appendChild(menuBtn);
    menuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
};
createMobileMenu();

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(45deg, #ff6b35, #ff8c42);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};
createScrollProgress();
