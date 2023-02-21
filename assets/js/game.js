function setupGame(numberOfLetters) {
    /* Reset the game board */
    const board = document.querySelector('#game-board');
    board.innerHTML = '';

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