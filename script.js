document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features with proper error handling
    try {
        initStickyHeader();
        initMobileMenu();
        initScrollAnimations();
        initParallaxEffects();
        initTypingAnimation();
        initSkillProgress();
        initContactForm();
        initScrollProgress();
        initParticles();
        initLoadingScreen();
        initScrollReveal();
        initMagneticEffect();
        initSmoothScroll();
        initScrollToTop();
        addCardHoverEffects();
        
        console.log('✅ All features initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing features:', error);
    }
});

// Sticky Header with Enhanced Effects
function initStickyHeader() {
    const header = document.querySelector("header");
    
    if (!header) return;
    
    window.addEventListener("scroll", function() {
        const scrolled = window.scrollY > 120;
        header.classList.toggle("sticky", scrolled);
        
        // Add shadow based on scroll
        if (scrolled) {
            header.style.boxShadow = "0 4px 20px var(--shadow-color)";
        } else {
            header.style.boxShadow = "none";
        }
    });
}

// Enhanced Mobile Menu - FIXED to prevent theme toggle conflicts
function initMobileMenu() {
    const menu = document.querySelector("#menu-icon");
    const navlist = document.querySelector('.navlist');
    const navLinks = document.querySelectorAll('.navlist a');
    
    if (!menu || !navlist) return;
    
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navlist.classList.toggle('active');
        
        // Add animation to nav links
        navLinks.forEach((link, index) => {
            link.style.animation = `slideInRight 0.5s ease ${index * 0.1}s both`;
        });
        
        // Prevent body scroll when menu is open
        if (navlist.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('bx-x');
            navlist.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside (FIX: exclude theme toggle)
    document.addEventListener('click', (e) => {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!menu.contains(e.target) && 
            !navlist.contains(e.target) && 
            (!themeToggle || !themeToggle.contains(e.target))) {
            menu.classList.remove('bx-x');
            navlist.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on scroll
    window.onscroll = () => {
        if (menu && navlist) {
            menu.classList.remove('bx-x');
            navlist.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
}

// Advanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add specific animations based on element
                if (entry.target.classList.contains('box')) {
                    entry.target.style.animation = 'fadeInScale 0.8s ease forwards';
                }
                
                if (entry.target.classList.contains('row')) {
                    entry.target.style.animation = 'slideInBottom 0.8s ease forwards';
                }
                
                if (entry.target.classList.contains('exp-item')) {
                    entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.box, .row, .exp-item, .about-text, .about-img').forEach(el => {
        observer.observe(el);
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-fast');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('parallax-slow') ? 0.5 : 0.8;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Typing Animation for Hero Section
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-subtitle');
    const texts = [
        "Web Developer",
        "UI/UX Designer", 
        "Creative Thinker",
        "Problem Solver"
    ];
    
    if (!typingText) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeText, typingSpeed);
    };
    
    typeText();
}

// Animated Skill Progress Bars
function initSkillProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    if (progressBars.length === 0) return;
    
    const animateProgress = (progressBar) => {
        const skill = progressBar.getAttribute('data-skill') || 0;
        const percentage = progressBar.parentElement.nextElementSibling;
        
        setTimeout(() => {
            progressBar.style.width = skill + '%';
            
            // Animate percentage counter
            let current = 0;
            const increment = skill / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= skill) {
                    current = skill;
                    clearInterval(timer);
                }
                if (percentage) {
                    percentage.textContent = Math.round(current) + '%';
                }
            }, 30);
        }, 500);
    };
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgress(entry.target);
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Enhanced Contact Form
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    const formMessage = document.querySelector('.form-message');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('.send-btn');
        if (!submitBtn) return;
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="ri-loader-4-line"></i>';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Add success animation
            submitBtn.style.animation = 'pulse-glow 1s ease';
            setTimeout(() => {
                submitBtn.style.animation = '';
            }, 1000);
            
        } catch (error) {
            showMessage('Failed to send message. Please try again.', 'error');
            
            // Add error animation
            submitBtn.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                submitBtn.style.animation = '';
            }, 500);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    function showMessage(message, type) {
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        formMessage.style.animation = 'slideInTop 0.5s ease';
        
        setTimeout(() => {
            formMessage.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 500);
        }, 5000);
    }
}

// Scroll Progress Bar
function initScrollProgress() {
    // Create progress bar if it doesn't exist
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercentage = (winScroll / height) * 100;
        scrollProgress.style.width = scrolledPercentage + '%';
    });
}

// Particle System
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    if (!particlesContainer) return;
    
    const particleCount = 30; // Reduced for performance
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (10 + Math.random() * 10) + 's';
    container.appendChild(particle);
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (!loadingScreen) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000); // Reduced loading time
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.stagger-item');
    
    if (revealElements.length === 0) return;
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Magnetic Effect for Interactive Elements - DISABLED for theme toggle compatibility
function initMagneticEffect() {
    // Skip magnetic effect to prevent conflicts with theme toggle
    // If you want to enable it, exclude theme toggle elements
    return;
    
    const magneticElements = document.querySelectorAll('.magnetic, .btn:not(.theme-toggle), .social-link');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Enhanced Scroll to Top
function initScrollToTop() {
    // Create scroll to top button if it doesn't exist
    if (!document.querySelector('.scroll-top')) {
        const scrollTop = document.createElement('button');
        scrollTop.className = 'scroll-top';
        scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTop.title = 'Scroll to top';
        document.body.appendChild(scrollTop);
    }
    
    const scrollTop = document.querySelector('.scroll-top');
    
    if (!scrollTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTop.style.opacity = '1';
            scrollTop.style.pointerEvents = 'auto';
        } else {
            scrollTop.style.opacity = '0';
            scrollTop.style.pointerEvents = 'none';
        }
    });
    
    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.box, .row');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(114, 170, 227, 0.1), transparent)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Add stagger animation classes
    document.querySelectorAll('.exp-item').forEach((item, index) => {
        item.classList.add('stagger-item');
    });
    
    document.querySelectorAll('.box').forEach((box, index) => {
        box.classList.add('stagger-item');
    });
    
    // Add parallax classes
    const heroSection = document.querySelector('.hero');
    const aboutImg = document.querySelector('.about-img');
    
    if (heroSection) heroSection.classList.add('parallax-slow');
    if (aboutImg) aboutImg.classList.add('parallax-fast');
    
    // Add loading screen if it doesn't exist
    if (!document.getElementById('loadingScreen')) {
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loadingScreen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p>Loading Portfolio...</p>
            </div>
        `;
        document.body.appendChild(loadingScreen);
    }
    
    // Add theme toggle if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Toggle theme (Ctrl+Shift+T)';
        document.body.appendChild(themeToggle);
    }
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations and updates
}, 10));

// Touch device detection
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Optimize for touch devices
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
    
    // Disable magnetic effect on touch devices
    const magneticElements = document.querySelectorAll('.magnetic, .btn, .social-link');
    magneticElements.forEach(element => {
        element.style.transform = 'none';
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Performance monitoring
if (window.performance && window.performance.navigation) {
    const navigationType = window.performance.navigation.type;
    if (navigationType === 1) {
        console.log('Page reloaded');
    }
}

// Theme compatibility fixes
document.addEventListener('DOMContentLoaded', function() {
    // Ensure theme toggle doesn't interfere with other elements
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Make sure theme toggle has highest z-index
        themeToggle.style.zIndex = '10000';
        
        // Prevent other scripts from interfering with theme toggle
        themeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Add touch support for mobile
        themeToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.click();
        });
    }
});

// Fix for smooth scroll navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navlist a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const menu = document.querySelector("#menu-icon");
                const navlist = document.querySelector('.navlist');
                if (menu && navlist) {
                    menu.classList.remove('bx-x');
                    navlist.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
});

// Add CSS for loading screen and scroll to top
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    #loadingScreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loading-content {
        text-align: center;
        color: var(--text-color);
    }
    
    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--main-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .scroll-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--main-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 18px;
        box-shadow: 0 4px 15px var(--shadow-color);
    }
    
    .scroll-top:hover {
        background: var(--other-color);
        transform: translateY(-5px);
        box-shadow: 0 6px 20px var(--shadow-color);
    }
    
    .scroll-top:active {
        transform: translateY(-2px);
    }
`;
document.head.appendChild(loadingStyles);