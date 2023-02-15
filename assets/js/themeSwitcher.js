const themeToggle = document.querySelector('#darkModeToggler');

themeToggle.addEventListener('change', function () {
    let theme = 'light';
    if (themeToggle.checked)
    {
        theme = 'dark';
    }

    document.querySelector('html').setAttribute('data-bs-theme', theme);
});