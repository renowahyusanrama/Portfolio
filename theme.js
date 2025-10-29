class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.html = document.documentElement;
        
        this.init();
    }
    
    init() {
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        // Add event listener to toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        
        // Add keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
    
    setTheme(theme) {
        this.html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateIcon(theme);
        this.updateThemeToggle(theme);
        
        // Add transition class for smooth theme switching
        this.html.classList.add('theme-transition');
        setTimeout(() => {
            this.html.classList.remove('theme-transition');
        }, 300);
        
        // Trigger custom event
        this.html.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }
    
    toggleTheme() {
        const currentTheme = this.html.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Add animation to toggle button
        if (this.themeToggle) {
            this.themeToggle.style.animation = 'rotate 0.5s ease';
            setTimeout(() => {
                this.themeToggle.style.animation = '';
            }, 500);
        }
    }
    
    updateIcon(theme) {
        if (this.themeIcon) {
            this.themeIcon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
        }
    }
    
    updateThemeToggle(theme) {
        if (this.themeToggle) {
            this.themeToggle.style.background = theme === 'dark' 
                ? 'var(--card-bg)' 
                : 'var(--bg-color)';
            this.themeToggle.style.borderColor = 'var(--main-color)';
        }
    }
    
    getTheme() {
        return this.html.getAttribute('data-theme') || 'dark';
    }
    
    // Method to get current color values
    getColor(colorName) {
        const styles = getComputedStyle(this.html);
        return styles.getPropertyValue(`--${colorName}`).trim();
    }
    
    // Method to check if dark mode is active
    isDarkMode() {
        return this.getTheme() === 'dark';
    }
    
    // Method to add theme-aware animations
    addThemeAwareAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .theme-transition {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
            }
            
            /* Theme-aware animations */
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            /* Smooth transitions for theme changes */
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
            }
            
            /* Prevent transitions on layout */
            *::before, *::after {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// Advanced Theme Features
class AdvancedThemeFeatures {
    constructor(themeManager) {
        this.themeManager = themeManager;
        this.init();
    }
    
    init() {
        this.addSystemThemeDetection();
        this.addTimeBasedTheme();
        this.addThemeAnimations();
        this.addThemeTooltips();
    }
    
    addSystemThemeDetection() {
        // Detect system preference on load
        if (window.matchMedia && !localStorage.getItem('theme')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.themeManager.setTheme(prefersDark ? 'dark' : 'light');
        }
    }
    
    addTimeBasedTheme() {
        // Auto-switch theme based on time (optional feature)
        const hour = new Date().getHours();
        const isDayTime = hour >= 6 && hour < 18;
        
        // Only apply if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            this.themeManager.setTheme(isDayTime ? 'light' : 'dark');
        }
    }
    
    addThemeAnimations() {
        // Add special animations for theme switching
        this.themeManager.html.addEventListener('themechange', (e) => {
            const { theme } = e.detail;
            
            // Create floating particles effect on theme change
            this.createThemeChangeParticles(theme);
            
            // Add ripple effect to toggle button
            if (this.themeManager.themeToggle) {
                this.createRippleEffect(this.themeManager.themeToggle);
            }
        });
    }
    
    createThemeChangeParticles(theme) {
        const colors = theme === 'dark' 
            ? ['#1b1f24', '#22282f', '#72aae3'] 
            : ['#f8f9fa', '#ffffff', '#4a90e2'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createParticle(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 50);
        }
    }
    
    createParticle(color) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            animation: particle-float 2s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
    
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(114, 170, 227, 0.3);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out forwards;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    addThemeTooltips() {
        if (this.themeManager.themeToggle) {
            this.themeManager.title = 'Toggle theme (Ctrl+Shift+T)';
            
            // Update tooltip based on current theme
            this.themeManager.html.addEventListener('themechange', (e) => {
                const { theme } = e.detail;
                this.themeManager.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode (Ctrl+Shift+T)`;
            });
        }
    }
}

// Theme Persistence and Sync
class ThemeSync {
    constructor(themeManager) {
        this.themeManager = themeManager;
        this.init();
    }
    
    init() {
        // Sync theme across tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme') {
                this.themeManager.setTheme(e.newValue || 'dark');
            }
        });
        
        // Save theme preference before page unload
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('theme', this.themeManager.getTheme());
        });
    }
}

// Initialize theme system
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    const advancedFeatures = new AdvancedThemeFeatures(themeManager);
    const themeSync = new ThemeSync(themeManager);
    
    // Add theme-aware animations
    themeManager.addThemeAwareAnimations();
    
    // Make theme manager globally accessible
    window.themeManager = themeManager;
    
    // Add CSS for ripple and particle animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
        
        @keyframes particle-float {
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, AdvancedThemeFeatures, ThemeSync };
}