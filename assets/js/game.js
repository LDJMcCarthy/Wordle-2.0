const menu = new bootstrap.Offcanvas(document.querySelector('#offcanvas'));

function setupGame(numberOfLetters, reset) {
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

    /* Reset the error text */
    hideError();

    if (reset)
    {
        /* Reset the current row and column counter */
        game_status.row = 0;
        game_status.column = 0;

        /* Reset the guesses and hardModeLetters attributes */
        game_status.guesses = [];
        game_status.hardModeLetters = new Set();

        /* Choose a word based off current selection */
        if (game_status['daily'][numberOfLetters] == false)
        {
            if (numberOfLetters == 4)
            {
                game_status['word'][numberOfLetters] = four[game_status.day % four.length].toUpperCase();
            }
            else if (numberOfLetters == 5)
            {
                game_status['word'][numberOfLetters] = five[game_status.day % five.length].toUpperCase();
            }
            else
            {
                game_status['word'][numberOfLetters] = six[game_status.day % six.length].toUpperCase();
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
    
    }
    else
    {
        for (let r  = 0; r < game_status.guesses.length; r++)
        {
            for (let c = 0; c < game_status.active; c++)
            {
                const cell = document.querySelectorAll('.game-row')[r].querySelectorAll('.game-column')[c];

                const letter = game_status.guesses[r][c];
                cell.innerText = letter;

                if (letter == game_status.word[game_status.active][c])
                {
                    cell.classList.add('correct-place');

                    document.querySelector('#' + letter).classList.remove('wrong-place');
                    document.querySelector('#' + letter).classList.remove('wrong');
                    document.querySelector('#' + letter).classList.add('correct-place');
                }
                else if (game_status.word[game_status.active].includes(letter))
                {
                    cell.classList.add('wrong-place');

                    if (document.querySelector('#' + letter).classList.contains('correct-place') == false)
                    {
                        document.querySelector('#' + letter).classList.remove('wrong');
                        document.querySelector('#' + letter).classList.add('wrong-place');
                    }
                }
                else
                {
                    cell.classList.add('wrong');
                    document.querySelector('#' + letter).classList.add('wrong');
                }
            }
        }
    }


    /* Hide the menu */
    menu.hide();

    saveState();
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
    setupGame(game_status.active, true);
    resultsModal.hide();
});

/* Listen for changes to hard mode */
document.querySelector('#hardModeToggler').addEventListener('click', function (event) {
    game_status.hardMode = event.target.checked;
    saveState();
});