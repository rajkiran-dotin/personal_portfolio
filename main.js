// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HAMBURGER MENU =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// ===== CLOSE MENU ON LINK CLICK =====
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to sections
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.about-panel, .services-grid, .projects-grid, .impact-band, .process-layout, .testimonial-grid, .contact-banner, .contact-container'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.05}s`;
    });

    // Also add to individual cards for staggered effect
    const cards = document.querySelectorAll(
        '.project-card, .service-card, .stat-card, .impact-stat, .testimonial-card'
    );

    cards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.05}s`;
    });

    // Trigger initial check
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// ===== TYPING EFFECT FOR HERO =====
const roles = ['Web Developer', 'Laravel Developer', 'Python Builder', 'WordPress Expert'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 80;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeEffect() {
    const subtitleEl = document.querySelector('.hero-subtitle');
    if (!subtitleEl) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    subtitleEl.innerHTML = `Full Stack <span class="gradient-text">${currentRole.substring(0, charIndex)}</span><span class="cursor">|</span>`;

    let timeout = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        timeout = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeout = 300;
    }

    setTimeout(typeEffect, timeout);
}

// Start typing effect after page load
setTimeout(typeEffect, 1500);

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-info h3, .resume-stat-card h3');

    counters.forEach(counter => {
        const text = counter.textContent;
        const match = text.match(/(\d+)/);
        if (!match) return;

        const target = parseInt(match[0]);
        const suffix = text.replace(match[0], '');
        let current = 0;
        const increment = target / 40;
        const duration = 40;

        // Only animate if not already animated
        if (counter.dataset.animated) return;
        counter.dataset.animated = 'true';

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, duration);
    });
}

// Trigger counter animation when about section is visible
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, { threshold: 0.3 });

const aboutSection = document.getElementById('about');
if (aboutSection) aboutObserver.observe(aboutSection);

const resumeSection = document.getElementById('resume');
if (resumeSection) aboutObserver.observe(resumeSection);

// ===== CONTACT FORM =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;

        const mailSubject = subject || `Portfolio inquiry from ${name}`;
        const mailBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:rajkiran@example.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-envelope-open-text"></i> Opening Email...';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        window.location.href = mailtoUrl;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 3000);

        console.log('Form submitted:', { name, email, subject, message });
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== CURSOR BLINK STYLE (injected) =====
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor {
        animation: blink 1s step-end infinite;
        font-weight: 300;
        color: var(--accent-primary);
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(cursorStyle);
