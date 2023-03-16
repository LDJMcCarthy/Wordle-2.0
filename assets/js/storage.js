let game_status = {};

const instructionModal = new bootstrap.Modal(document.querySelector('#instructions'));


if (localStorage.getItem('game_status') === null)
{
    game_status = 
    {
        daily: 
        {
            4: [false, undefined],
            5: [false, undefined],
            6: [false, undefined]
        },
        word:
        {
            4: '',
            5: five[dateCalc() % five.length].toUpperCase(),
            6: ''
        },
        stats:
        {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
        },
        active: 5,
        submitted: false,
        day: dateCalc(),
        hardMode: false,
        hardModeLetters: new Set(),
        guesses: [],
        streak: 0,
        streakLastDay: dateCalc() - 1,
        row: 0,
        column: 0,
        locked: false
    };

    /* Show help modal */
    instructionModal.show();
} else {
    /* Load and decode */
    game_status = JSON.parse(localStorage.getItem('game_status'));

    if (game_status.day == dateCalc())
    {
        /* Update daily markers */
        for (let x in game_status.daily)
        {
            if (game_status.daily[x][0]) {
                if (game_status.daily[x][1])
                {
                    document.querySelector('#button_' + x + '_letters i').classList.add('text-success');
                    document.querySelector('#button_' + x + '_letters p').classList.add('text-success');   
                }
                else
                {
                    document.querySelector('#button_' + x + '_letters i').classList.add('text-danger');
                    document.querySelector('#button_' + x + '_letters p').classList.add('text-danger');    
                }
                if (game_status.active == x)
                {
                    document.querySelector('#play-button').innerText = 'Practise';
                }
            }
        }

        game_status.hardModeLetters = new Set(game_status.hardModeLetters);
    } else {
        game_status.day = dateCalc();

        game_status.daily['4'] = [false, undefined];
        game_status.daily['5'] = [false, undefined];
        game_status.daily['6'] = [false, undefined];

        /* Reset guesses */
        game_status.guesses = [];
        game_status.hardModeLetters = new Set();

        if (game_status.active == 4)
        {
            game_status['word'][game_status.active] = four[game_status.day % four.length].toUpperCase();
        }
        else if (game_status.active == 5)
        {
            game_status['word'][game_status.active] = five[game_status.day % five.length].toUpperCase();
        }
        else
        {
            game_status['word'][game_status.active] = six[game_status.day % six.length].toUpperCase();
        }

    }

    if (game_status.streakLastDay <=  game_status.day - 2)
    {
        game_status.streak = 0;
        game_status.streakLastDay = game_status.day - 1;
    }

    game_status.column = 0;


    saveState();


    /* Update active indicator */
    window.addEventListener('DOMContentLoaded', function () {
        document.querySelector('#button_' + game_status.active + '_letters').click();
        setupGame(game_status.active, false);
    });

    document.querySelector('#hardModeToggler').checked = game_status.hardMode;

    if (game_status.locked)
    {
        document.querySelector('#play-warning').classList.remove('d-none');
        document.querySelector('#play-button').innerText = 'Game in progress';
    }
}

function saveState()
{
    game_status.hardModeLetters = Array.from(game_status.hardModeLetters);
    localStorage.setItem('game_status', JSON.stringify(game_status));
    game_status.hardModeLetters = new Set(game_status.hardModeLetters);
}

function dateCalc()
{
    const start_date = new Date("03/01/2023");
    const today_date = new Date();
    let days = Math.floor((today_date.getTime() - start_date.getTime())/ (1000 * 3600 * 24));
    return days;
}