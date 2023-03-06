/* Handle the user typing */

let row = 0;
let column = 0;
let lastKey;

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
            else if (game_status.submitted)
            {
                showError('Game already completed! Please start a new one from the menu.');
            }
            else
            {
                let word = '';
                document.querySelectorAll('.game-row')[row].querySelectorAll('.game-column').forEach((letter) => {
                    word += letter.innerText;
                });

                let valid = false

                if (game_status.active == 4)
                {
                    valid = four.includes(word);
                }
                else if (game_status.active == 5)
                {
                    valid = five.includes(word);
                }
                else
                {
                    valid = six.includes(word);
                }

                if (valid)
                {
                    let greenCount = 0;

                    for (let i = 0; i < word.length; i++)
                    {

                        setTimeout(function() {
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

                        },i * 500);

                    }

                    setTimeout(function() {
                        if(greenCount == game_status.active)
                        {
                            game_status['daily'][game_status.active] = true;
                            document.querySelector('#play-button').innerText = 'Practise';
                            document.querySelector('.gamemode-link.active i').classList.add('text-success');
                            document.querySelector('.gamemode-link.active p').classList.add('text-success');
                            /* Show win */
                            setTimeout(function(){showResult(true)}, 1000);

                            game_status.submitted = true;
                        }

                        else
                        {
                            row++;
                            column = 0;
                        }

                        if (row == (game_status.active + 1))
                        {
                            game_status['daily'][game_status.active] = true;
                            document.querySelector('#play-button').innerText = 'Practise';
                            document.querySelector('.gamemode-link.active i').classList.add('text-danger');
                            document.querySelector('.gamemode-link.active p').classList.add('text-danger');
                            /* Show lost */
                            setTimeout(function(){showResult(false)}, 1000);

                            game_status.submitted = true;
                        }

                    }, (word.length - 1) * 500);

                } 
                else
                {
                    showError('Not a valid word!');
                } 


            }
        }

    });
});

/* Allow the user to type answers */
window.addEventListener('keyup', function(event)
{
    
    if (event.keyCode == lastKey && event.keyCode == 13)
    {
        return;
    }
    if (event.keyCode == 13)
    {
        lastKey = event.keyCode;
        document.querySelector('#enter').click();
    }
    else if (event.keyCode == 8)
    {
        lastKey = event.keyCode;
        document.querySelector('#delete').click();
    }
    else if (event.keyCode >= 65 && event.keyCode <= 90)
    {
        lastKey = event.keyCode;
        document.querySelector('#' +  String.fromCharCode(event.keyCode)).click();
    }
});