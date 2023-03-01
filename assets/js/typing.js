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
        else if (target == 'ENTER')
        {
            if (currentRow.querySelectorAll('.game-column').length != column)
            {
                showError('Not enough letters!');
            }
            else
            {
                let word = '';
                document.querySelectorAll('.game-row')[row].querySelectorAll('.game-column').forEach((letter) => {
                    word += letter.innerText;
                });

                let greenCount = 0;

                //Validate word here

                for (let i = 0; i < word.length; i++)
                {
                    if (word[i] == game_status["word"][game_status.active][i])
                    {
                        document.querySelectorAll('.game-row')[row].querySelectorAll('.game-column')[i].classList.add('correct-place');
                        document.querySelector('#' + word[i]).classList.remove('wrong-place');
                        document.querySelector('#' + word[i]).classList.remove('wrong');
                        document.querySelector('#' + word[i]).classList.add('correct-place');

                        greenCount++;
                    }
                    else if (game_status["word"][game_status.active].includes(word[i]))
                    {
                        document.querySelectorAll('.game-row')[row].querySelectorAll('.game-column')[i].classList.add('wrong-place');
                        
                        if (document.querySelector('#' + word[i]).classList.contains('correct-place') == false)
                        {
                            document.querySelector('#' + word[i]).classList.remove('wrong');
                            document.querySelector('#' + word[i]).classList.add('wrong-place');
                        }
                    }
                    else
                    {
                        document.querySelectorAll('.game-row')[row].querySelectorAll('.game-column')[i].classList.add('wrong');
                        document.querySelector('#' + word[i]).classList.add('wrong');
                    }
                }


                if(greenCount == game_status.active)
                {
                    /* Show win */
                    alert('win');
                    game_status['daily'][game_status.active] = true;
                }
                else
                {
                    row++;
                    column = 0;
                }

                if (row == (game_status.active + 1))
                {
                    /* Show lost */
                    alert('lost');
                    game_status['daily'][game_status.active] = true;
                }

            }
        }

    });
});