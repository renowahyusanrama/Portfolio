document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
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
});

// Sticky Header with Enhanced Effects
function initStickyHeader() {
    const header = document.querySelector("header");
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener("scroll", function() {
        const scrolled = window.scrollY > 120;
        header.classList.toggle("sticky", scrolled);
        
        // Update scroll progress bar
        if (scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolledPercentage = (winScroll / height) * 100;
            scrollProgress.style.width = scrolledPercentage + "%";
        }
        
        // Add shadow based on scroll
        if (scrolled) {
            header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.boxShadow = "none";
        }
    });
}

// Enhanced Mobile Menu
function initMobileMenu() {
    const menu = document.querySelector("#menu-icon");
    const navlist = document.querySelector('.navlist');
    const navLinks = document.querySelectorAll('.navlist a');
    
    if (menu && navlist) {
        menu.onclick = () => {
            menu.classList.toggle('bx-x');
            navlist.classList.toggle('active');
            
            // Add animation to nav links
            navLinks.forEach((link, index) => {
                link.style.animation = `slideInRight 0.5s ease ${index * 0.1}s both`;
            });
        }
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('bx-x');
                navlist.classList.remove('active');
            });
        });
    }
    
    // Close menu on scroll
    window.onscroll = () => {
        if (menu && navlist) {
            menu.classList.remove('bx-x');
            navlist.classList.remove('active');
        }
    }
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
    
    if (typingText) {
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
        }
        
        typeText();
    }
}

// Animated Skill Progress Bars
function initSkillProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const animateProgress = (progressBar) => {
        const skill = progressBar.getAttribute('data-skill');
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
                percentage.textContent = Math.round(current) + '%';
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
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = form.querySelector('.send-btn');
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
    }
    
    function showMessage(message, type) {
        if (formMessage) {
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
}

// Scroll Progress Bar
function initScrollProgress() {
    // Create progress bar if it doesn't exist
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
}

// Particle System
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer, i);
        }
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
    
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        });
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.stagger-item');
    
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

// Magnetic Effect for Interactive Elements
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic, .btn, .social-link');
    
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
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Enhanced Scroll to Top
function initScrollToTop() {
    const scrollTop = document.querySelector('.scroll-top');
    
    if (scrollTop) {
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
    addCardHoverEffects();
    initScrollToTop();
    
    // Add stagger animation classes
    document.querySelectorAll('.exp-item').forEach((item, index) => {
        item.classList.add('stagger-item');
    });
    
    document.querySelectorAll('.box').forEach((box, index) => {
        box.classList.add('stagger-item');
    });
    
    // Add parallax classes
    document.querySelector('.hero')?.classList.add('parallax-slow');
    document.querySelector('.about-img')?.classList.add('parallax-fast');
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
    // Scroll-based animations here
}, 10));