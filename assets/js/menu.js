
/* Handle switching number of letters */
document.querySelectorAll('.gamemode-link').forEach((element) => {
    element.addEventListener('click', function (event) {
        let target = event.target;

        while (target.classList.contains('gamemode-link') ==  false)
        {
            target = target.parentNode;
        }

        if (target.classList.contains('active') == false)
        {
            document.querySelector('.gamemode-link.active').classList.remove('active');
            target.classList.add('active');
        }
    });
});

/* Handle user pressing play */
document.querySelector('#play-button').addEventListener('click', function() {
    let letters = document.querySelector('.gamemode-link.active').dataset.value;
    
    setupGame(parseInt(letters));
});