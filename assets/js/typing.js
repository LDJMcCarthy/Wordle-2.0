/* Handle the user typing */

let row = 0;
let column = 0;

/* Add event listeners */
document.querySelectorAll('.key').forEach((key) => {
    key.addEventListener('click', function(event) {
        hideError();
        const currentRow = document.querySelectorAll('.game-row')[row];

        let target = event.target;
        if (target.classList.contains('fa-solid'))
        {
            target = target.parentNode;
        }

        target = target.innerText;

        if (target != 'ENTER' && target != '')
        {
            if (currentRow.querySelectorAll('.game-column').length != column)
            {
                currentRow.querySelectorAll('.game-column')[column].innerText = target;
                column++;
            }
        }

        else if (target == '' && column > 0)
        {
            column--;
            currentRow.querySelectorAll('.game-column')[column].innerText = '';
        }

        /* Handle enter being pressed */
        else
        {
            if (currentRow.querySelectorAll('.game-column').length != column)
            {
                showError('Not enough letters!');
            }
            else
            {
                /* Validate word here */
                /* Check word here (and colour) */
                row++;
                column = 0;

                /* if row is at maximum, end game */
            }
        }

    });
});