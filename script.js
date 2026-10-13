document.addEventListener('DOMContentLoaded', function () {
    initStickyHeader();
    initMobileMenu();
    initTypingAnimation();
    initSkillProgress();
    initContactForm();
    initScrollProgress();
    initScrollToTop();
    initSmoothScroll();
    initLoadingScreen();
});

/* Sticky header */
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const onScroll = () => {
        header.classList.toggle('sticky', window.scrollY > 80);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

/* Mobile menu */
function initMobileMenu() {
    const menu = document.querySelector('#menu-icon');
    const navlist = document.querySelector('.navlist');
    if (!menu || !navlist) return;

    const closeMenu = () => {
        menu.classList.remove('bx-x');
        navlist.classList.remove('active');
        document.body.style.overflow = '';
    };

    const openMenu = () => {
        menu.classList.add('bx-x');
        navlist.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    menu.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navlist.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navlist.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (!navlist.classList.contains('active')) return;
        if (!navlist.contains(e.target) && !menu.contains(e.target)) {
            closeMenu();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

/* Typing subtitle in the hero */
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-subtitle');
    if (!typingText) return;

    const texts = ['Web Developer', 'UI/UX Designer', 'Creative Thinker', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = texts[textIndex];
        charIndex += isDeleting ? -1 : 1;
        typingText.textContent = current.substring(0, charIndex);

        let delay = isDeleting ? 45 : 90;

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            delay = 1600;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            delay = 400;
        }

        setTimeout(type, delay);
    }

    type();
}

/* Skill bars fill when scrolled into view */
function initSkillProgress() {
    const bars = document.querySelectorAll('.progress-fill');
    if (!bars.length) return;

    const fill = (bar) => {
        const target = Number(bar.getAttribute('data-skill')) || 0;
        const label = bar.closest('.skill-progress')?.querySelector('.skill-percentage');

        bar.style.width = target + '%';

        if (label) {
            let current = 0;
            const step = target / 40;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                label.textContent = Math.round(current) + '%';
            }, 25);
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                fill(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    bars.forEach((bar) => observer.observe(bar));
}

/* Contact form — opens the visitor's mail client with the message filled in */
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    const formMessage = document.querySelector('.form-message');
    if (!form) return;

    const showMessage = (text, type) => {
        if (!formMessage) return;
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 6000);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));
        const name = (data.name || '').toString().trim();
        const email = (data.email || '').toString().trim();
        const message = (data.message || '').toString().trim();

        const subject = `Portfolio enquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

        window.location.href =
            'mailto:onmeren@gmail.com' +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(body);

        showMessage('Opening your email app to send this message...', 'success');
    });
}

/* Reading progress bar */
function initScrollProgress() {
    let bar = document.querySelector('.scroll-progress');
    if (!bar) {
        bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);
    }

    const onScroll = () => {
        const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        bar.style.width = pct + '%';
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

/* Scroll to top */
function initScrollToTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    const onScroll = () => {
        btn.classList.toggle('visible', window.scrollY > 300);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* Smooth scrolling and active nav link */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href').slice(1);
            const target = id ? document.getElementById(id) : null;
            if (!target) return;

            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    const navLinks = document.querySelectorAll('.navlist a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
        let current = '';
        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.id;
            }
        });
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

/* Hide the loading screen once the page is ready (with a fallback) */
function initLoadingScreen() {
    const screen = document.getElementById('loadingScreen');
    if (!screen) return;

    const hide = () => {
        screen.classList.add('hidden');
        setTimeout(() => {
            screen.style.display = 'none';
        }, 400);
    };

    window.addEventListener('load', () => setTimeout(hide, 350));
    setTimeout(hide, 3500);
}