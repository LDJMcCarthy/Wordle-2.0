const themeToggle = document.querySelector('#darkModeToggler');

themeToggle.addEventListener('change', function () {
    let theme = 'light';
    if (themeToggle.checked)
    {
        theme = 'dark';
    }

    localStorage.setItem('theme', theme);

    document.querySelector('html').setAttribute('data-bs-theme', theme);
});

if (localStorage.getItem('theme') === null)
{
    localStorage.setItem('theme', 'light')
}

document.querySelector('html').setAttribute('data-bs-theme', localStorage.getItem('theme'));

themeToggle.checked = (localStorage.getItem('theme') == 'dark');