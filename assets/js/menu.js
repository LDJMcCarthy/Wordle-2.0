
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

            const number = parseInt(target.querySelector('.col-12 p').innerHTML);
            if(game_status['daily'][number][0])
            {
                document.querySelector('#play-button').innerText = 'Practise';
            }
            else if (game_status.locked && (game_status.active == number))
            {
                document.querySelector('#play-button').innerText = 'Game in progress';
            }
            else
            {
                document.querySelector('#play-button').innerText = 'Play';
            }
        }
    });
});

/* Handle user pressing play */
document.querySelector('#play-button').addEventListener('click', function() {
    let letters = parseInt(document.querySelector('.gamemode-link.active').dataset.value);

    if (game_status.locked)
    {
        if (letters != game_status.active)
        {
            game_status.daily[game_status.active] = [true, false];

            document.querySelector('#button_' + game_status.active + '_letters i').classList.add('text-danger');
            document.querySelector('#button_' + game_status.active + '_letters p').classList.add('text-danger');  

            game_status.locked = false;
            game_status.streak = 0;

            document.querySelector('#play-warning').classList.add('d-none');

            saveState();

            setupGame(letters, true);
        }
    }
    else
    {
        setupGame(letters, true);
    }
});