// PixelCanvas Studio Main Script - Cleaned of unused code
// Mobile Menu Functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!mobileMenuBtn || !navWrapper) return;
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !expanded);
        navWrapper.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navWrapper.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navWrapper.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navWrapper.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Active navigation state management
function setupActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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
    updateActiveNav(); // Initial call
}

// Theme Toggle Functionality
function toggleTheme() {
    const body = document.documentElement;
    const currentTheme = body.getAttribute('data-theme');
    const themeIcon = document.querySelector('.theme-toggle-icon');
    if (!themeIcon) return;
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.textContent = '🌞'; // Sun emoji for light mode
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '🌙'; // Moon emoji for dark mode
        localStorage.setItem('theme', 'dark');
    }
}
// Set initial theme based on user's preference
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeIcon = document.querySelector('.theme-toggle-icon');
    if (!themeIcon) return;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '🌙';
    } else {
        themeIcon.textContent = '🌞';
    }
}

// Enhanced Scroll Animation Function with Staggered Delay
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        if (elementTop < triggerPoint) {
            // Set transition delay if data-animate-delay is present
            const delay = element.getAttribute('data-animate-delay');
            if (delay) {
                element.style.setProperty('--animate-delay', `${delay}ms`);
            } else {
                element.style.removeProperty('--animate-delay');
            }
            element.classList.add('active');
        }
    });
}

// Number Counter Animation
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 30; // Adjust speed here
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 50);
    });
}
// Contact Us Button Navigation
function setupContactButton() {
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            window.location.href = 'contact-card.html';
        });
    }
}
// DOMContentLoaded Initialization
function init() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    setInitialTheme();
    setupMobileMenu();
    setupContactButton();
    setupNavbarScroll();
    setupActiveNavigation();
    handleScrollAnimations();
    window.addEventListener('scroll', handleScrollAnimations);
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    obs.unobserve(entry.target);
                }
            });
        });
        observer.observe(statsSection);
    }
}
document.addEventListener('DOMContentLoaded', init);
