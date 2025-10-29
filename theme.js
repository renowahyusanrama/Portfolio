document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    // Load saved theme or default to dark (sesuai CSS portfolio Anda)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Update icon based on theme
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        // FIX: Remove any existing event listeners to prevent conflicts
        const newThemeToggle = themeToggle.cloneNode(true);
        themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle);
        
        // Add fresh event listener with proper handling
        newThemeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Prevent multiple rapid clicks
            if (this.dataset.toggling === 'true') return;
            this.dataset.toggling = 'true';
            
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Update theme with smooth transition
            htmlElement.style.transition = 'all 0.3s ease';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon with fade animation
            updateThemeIcon(newTheme);
            
            // Remove transition after animation completes
            setTimeout(() => {
                htmlElement.style.transition = '';
                delete this.dataset.toggling;
            }, 300);
        });
        
        // Add touch support for mobile devices
        newThemeToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
        
        // Add keyboard support
        newThemeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    function updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            // Add fade out effect
            themeIcon.style.opacity = '0';
            themeIcon.style.transform = 'scale(0.8) rotate(-180deg)';
            
            setTimeout(() => {
                // Update icon class based on theme
                if (theme === 'dark') {
                    themeIcon.className = 'fas fa-moon';
                } else {
                    themeIcon.className = 'fas fa-sun';
                }
                
                // Fade in effect
                themeIcon.style.opacity = '1';
                themeIcon.style.transform = 'scale(1) rotate(0deg)';
            }, 150);
        }
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            // Only change if user hasn't manually set a theme
            if (!localStorage.getItem('theme')) {
                const systemTheme = e.matches ? 'dark' : 'light';
                htmlElement.setAttribute('data-theme', systemTheme);
                updateThemeIcon(systemTheme);
            }
        });
    }
    
    // Add keyboard shortcut (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            if (themeToggle) {
                themeToggle.click();
            }
        }
    });
    
    // Initialize theme toggle position and state
    function initializeThemeToggle() {
        if (themeToggle) {
            // Ensure proper positioning
            themeToggle.style.position = 'fixed';
            themeToggle.style.top = '20px';
            themeToggle.style.right = '20px';
            themeToggle.style.zIndex = '10000';
            
            // Add hover tooltip
            themeToggle.title = 'Toggle theme (Ctrl+Shift+T)';
            
            // Add loading animation
            themeToggle.style.animation = 'fadeInScale 0.5s ease';
        }
    }
    
    initializeThemeToggle();
});

// Additional CSS for smooth theme transitions and icon animations
const themeStyles = document.createElement('style');
themeStyles.textContent = `
    /* FIX: Prevent theme toggle from moving */
    .theme-toggle {
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        margin: 0 !important;
        padding: 0 !important;
        transform: none !important;
        transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease !important;
        will-change: transform;
        backface-visibility: hidden;
        -webkit-font-smoothing: antialiased;
    }
    
    .theme-toggle:hover {
        transform: scale(1.1) rotate(180deg) !important;
    }
    
    .theme-toggle:active {
        transform: scale(1.05) rotate(180deg) !important;
    }
    
    /* Smooth icon transitions */
    .theme-toggle i {
        transition: opacity 0.15s ease, transform 0.3s ease;
        display: block;
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
    }
    
    .theme-toggle:hover i {
        transform: scale(1.1);
    }
    
    /* Theme transition for smooth switching */
    .theme-transition {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
    }
    
    /* Prevent layout shift during theme change */
    * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    /* Loading animation */
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* Ensure theme toggle stays in place during animations */
    .theme-toggle[data-toggling="true"] {
        pointer-events: none;
    }
    
    /* Mobile touch optimizations */
    @media (max-width: 768px) {
        .theme-toggle {
            top: 15px !important;
            right: 15px !important;
            width: 45px !important;
            height: 45px !important;
        }
        
        .theme-toggle i {
            font-size: 20px !important;
            width: 20px !important;
            height: 20px !important;
            line-height: 20px !important;
        }
    }
    
    @media (max-width: 480px) {
        .theme-toggle {
            top: 10px !important;
            right: 10px !important;
            width: 40px !important;
            height: 40px !important;
        }
        
        .theme-toggle i {
            font-size: 18px !important;
            width: 18px !important;
            height: 18px !important;
            line-height: 18px !important;
        }
    }
`;
document.head.appendChild(themeStyles);

// Theme utility functions
window.themeUtils = {
    getCurrentTheme: function() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    },
    
    setTheme: function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        // Trigger theme change event
        document.documentElement.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme } 
        }));
    },
    
    toggleTheme: function() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },
    
    isDarkMode: function() {
        return this.getCurrentTheme() === 'dark';
    },
    
    getThemeColor: function(colorName) {
        const styles = getComputedStyle(document.documentElement);
        return styles.getPropertyValue(`--${colorName}`).trim();
    }
};

// Auto-initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arguments.callee);
} else {
    // DOM is already loaded, initialize immediately
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}