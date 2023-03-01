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
    active: 5
};

window.addEventListener('DOMContentLoaded', function () {
    setupGame(5);
});

function setupGame(numberOfLetters) {
    /* Reset the game board */
    const board = document.querySelector('#game-board');
    board.innerHTML = '';

    game_status['active'] = numberOfLetters;

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
        key.classList.remove('wrong', 'wrong-place', 'correct-place');
    });

    /* Reset the current row and column counter */
    row = 0;
    column = 0;

    /* Reset the error text */
    hideError();

    /* Choose a word based off current selection */
    if (game_status['daily'][numberOfLetters] == false)
    {
        if (numberOfLetters == 4)
        {
            game_status['word'][numberOfLetters] = four[dateCalc()].toUpperCase();
        }
        else if (numberOfLetters == 5)
        {
            game_status['word'][numberOfLetters] = five[dateCalc()].toUpperCase();
        }
        else
        {
            game_status['word'][numberOfLetters] = six[dateCalc()].toUpperCase();
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