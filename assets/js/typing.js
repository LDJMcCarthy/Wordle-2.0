/* Handle the user typing */

/* Add event listeners */
document.querySelectorAll('.key').forEach((key) => { /* Selects all the keys */
    key.addEventListener('click', function(event) { /* Event listener for the keys */
        hideError();
        const currentRow = document.querySelectorAll('.game-row')[game_status.row]; /* Initialises currentRow */
        let target = event.target; /* Initialises target as which key was pressed. */
        if (target.classList.contains('fa-solid')) /* selects if the target has the class "fa-solid" */
        {
            target = target.parentNode; /* Assigns the parentNode */
        }

        target = target.innerText; /* Assigns the innerText */

        let count = 0

        while (count != 500)
        {
            count++;
        }




        if (target != 'ENTER' && target != '') /* Selects if the key is a letter */
        {
            if (currentRow.querySelectorAll('.game-column').length != game_status.column) /* Selects if at the end of row */
            {
                currentRow.querySelectorAll('.game-column')[game_status.column].innerText = target; /* Inserts the character into game grid */
                game_status.column++; /* Increments the column */
                saveState(); /* Saves the game state. */
                
            }
        }

        else if (target == '' && game_status.column > 0) /* Selects if the key is backspace */
        {
            game_status.column--; /* Decrements the column */
            saveState(); /* Saves the game state. */
            currentRow.querySelectorAll('.game-column')[game_status.column].innerText = ''; /* Removes the letter from the column. */
        }

        /* Handle enter being pressed */
        else if (target == 'ENTER')
        {
            /* Set locked if needed */
            if (game_status.daily[game_status.active][0] == false)
            {
                game_status.locked = true;
                saveState();

                document.querySelector('#play-warning').classList.remove('d-none');

                document.querySelector('#play-button').innerText = 'Game in progress';
            }

            if (currentRow.querySelectorAll('.game-column').length != game_status.column)
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
                document.querySelectorAll('.game-row')[game_status.row].querySelectorAll('.game-column').forEach((letter) => {
                    word += letter.innerText;
                });

                /* Check hard mode */
                let hardModeSatisfied = true;
                game_status.hardModeLetters.forEach((letter) => {
                    if (word.includes(letter) == false) {
                        hardModeSatisfied = false;
                    }
                });

                if (game_status.hardMode && !hardModeSatisfied) {
                    showError('You must use previously revealed hints in your guess whilst in hard mode.');
                }
                else
                {
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
                        game_status.guesses.push(word.split(''));
                        
                        let greenCount = 0;

                        for (let i = 0; i < word.length; i++)
                        {

                            setTimeout(function() {
                                if (word[i] == game_status["word"][game_status.active][i])
                                {
                                    document.querySelectorAll('.game-row')[game_status.row].querySelectorAll('.game-column')[i].classList.add('correct-place');
                                    document.querySelector('#' + word[i]).classList.remove('wrong-place');
                                    document.querySelector('#' + word[i]).classList.remove('wrong');
                                    document.querySelector('#' + word[i]).classList.add('correct-place');

                                    game_status.hardModeLetters.add(word[i]);
                                    saveState();

                                    greenCount++;
                                }
                                else if (game_status["word"][game_status.active].includes(word[i]))
                                {
                                    document.querySelectorAll('.game-row')[game_status.row].querySelectorAll('.game-column')[i].classList.add('wrong-place');
                                    
                                    if (document.querySelector('#' + word[i]).classList.contains('correct-place') == false)
                                    {
                                        document.querySelector('#' + word[i]).classList.remove('wrong');
                                        document.querySelector('#' + word[i]).classList.add('wrong-place');
                                    }

                                    game_status.hardModeLetters.add(word[i]);
                                    saveState();
                                }
                                else
                                {
                                    document.querySelectorAll('.game-row')[game_status.row].querySelectorAll('.game-column')[i].classList.add('wrong');
                                    document.querySelector('#' + word[i]).classList.add('wrong');
                                }

                            },i * 0);

                        }

                        setTimeout(function() {
                            if(greenCount == game_status.active)
                            {
                                if (game_status.streakLastDay == game_status.day - 1 && game_status['daily'][game_status.active][0] == false)
                                {
                                    game_status.streak++;
                                    game_status.streakLastDay++;
                                }

                                if (game_status['daily'][game_status.active][0] == false)
                                {
                                    game_status['daily'][game_status.active] = [true, true];
                                    document.querySelector('#play-button').innerText = 'Practise';
                                    document.querySelector('.gamemode-link.active i').classList.add('text-success');
                                    document.querySelector('.gamemode-link.active p').classList.add('text-success');
                                }
                                /* Show win */
                                game_status.stats[game_status.row + 1]++;
                                generateResultsStats(true);
                                setTimeout(function(){showResult(true)}, 1000);

                                game_status.submitted = true;


                                game_status.locked = false;
                                document.querySelector('#play-warning').classList.add('d-none');

                                saveState();
                            }

                            else
                            {
                                game_status.row++;
                                game_status.column = 0;

                                saveState();
                            }
                            if (game_status.row == (game_status.active + 1))
                            {
                                if (game_status['daily'][game_status.active][0] == false)
                                {
                                    game_status['daily'][game_status.active] = [true, false];
                                    document.querySelector('#play-button').innerText = 'Practise';
                                    document.querySelector('.gamemode-link.active i').classList.add('text-danger');
                                    document.querySelector('.gamemode-link.active p').classList.add('text-danger');
                                }
                                if (game_status.streakLastDay == game_status.day - 1 && game_status['daily'][4][0] && game_status['daily'][5][0] && game_status['daily'][6][0])
                                {
                                    game_status.streak = 0;
                                    game_status.streakLastDay++;
                                }
                                
                                /* Show lost */
                                generateResultsStats(false);
                                setTimeout(function(){showResult(false)}, 1000);

                                game_status.submitted = true;

                                game_status.locked = false;
                                document.querySelector('#play-warning').classList.add('d-none');
                                saveState();
                            }

                        }, (word.length - 1) * 0);

                    } 
                    else
                    {
                        showError('Not a valid word!');
                    } 

                }

            }
        }

    });
});

/* Allow the user to type answers */
window.addEventListener('keyup', function(event)
{
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