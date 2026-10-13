document.addEventListener('DOMContentLoaded', function () {
    const root = document.documentElement;
    const toggle = document.querySelector('.theme-toggle');
    const icon = toggle ? toggle.querySelector('i') : null;

    const applyTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    };

    applyTheme(localStorage.getItem('theme') || 'dark');

    if (toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });
    }

    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            if (toggle) toggle.click();
        }
    });
});