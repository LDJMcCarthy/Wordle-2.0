const menu = new bootstrap.Offcanvas(document.querySelector('#offcanvas'));

let game_status = 
{
    daily: 
    {
        4: false,
        5: false,
        6: false
    },
    word:
    {
        4: '',
        5: '',
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
    day: 0, /* Update on load */
    hardMode: false,
    hardModeLetters: new Set(),
    guesses: [],
    streak: 0
};

window.addEventListener('DOMContentLoaded', function () {
    setupGame(5);
});

function setupGame(numberOfLetters) {
    /* Reset the game board */
    const board = document.querySelector('#game-board');
    board.innerHTML = '';

    game_status['active'] = numberOfLetters;
    game_status['submitted'] = false;

    for (let i = 0; i < numberOfLetters + 1; i++)
    {
        const row = document.createElement('div');
        row.classList.add('row', 'game-row');

        for (let j = 0; j < numberOfLetters; j++)
        {
            const cell = document.createElement('div');
            cell.classList.add('column', 'game-column');

            row.appendChild(cell);
        }

        board.appendChild(row);
    }

    /* Reset the keyboard */
    document.querySelectorAll('.key').forEach((key) => {
        key.classList.remove('correct-place', 'wrong-place', 'wrong')
    });

    /* Reset the current row and column counter */
    row = 0;
    column = 0;

    /* Reset the error text */
    hideError();

    /* Reset the guesses and hardModeLetters attributes */
    game_status.guesses = [];
    game_status.hardModeLetters = new Set();

    /* Choose a word based off current selection */
    if (game_status['daily'][numberOfLetters] == false)
    {
        if (numberOfLetters == 4)
        {
            game_status['word'][numberOfLetters] = four[dateCalc() % four.length].toUpperCase();
        }
        else if (numberOfLetters == 5)
        {
            game_status['word'][numberOfLetters] = five[dateCalc() % five.length].toUpperCase();
        }
        else
        {
            game_status['word'][numberOfLetters] = six[dateCalc() % five.length].toUpperCase();
        }
    }
    else
    {
        if (numberOfLetters == 4)
        {
            game_status["word"][numberOfLetters] = four[Math.floor(Math.random() * four.length)].toUpperCase();
        }
        else if (numberOfLetters == 5)
        {
            game_status["word"][numberOfLetters] = five[Math.floor(Math.random() * five.length)].toUpperCase();
        }
        else
        {
            game_status["word"][numberOfLetters] = six[Math.floor(Math.random() * six.length)].toUpperCase();
        }
    }


    /* Hide the menu */
    menu.hide();
}

function dateCalc()
{
    const start_date = new Date("03/01/2023");
    const today_date = new Date();
    let days = Math.floor((today_date.getTime() - start_date.getTime())/ (1000 * 3600 * 24));
    return days;
}

function showError(msg)
{
    document.querySelector('#errorText').classList.remove('d-none');
    document.querySelector('#errorText').innerText = msg;
}

function hideError()
{
    document.querySelector('#errorText').classList.add('d-none');
}

document.querySelector('#retry').addEventListener('click', function () {
    setupGame(game_status.active);
    resultsModal.hide();
});

/* Listen for changes to hard mode */
document.querySelector('#hardModeToggler').addEventListener('click', function (event) {
    game_status.hardMode = event.target.checked;
});