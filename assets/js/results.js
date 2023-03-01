const resultsModal = new bootstrap.Modal(document.querySelector('#results'));

function showResult(correct)
{
    if (correct)
    {
        document.querySelector('#results_feedback').innerText = 'Congratulations! You solved the wordle!';
    }
    else
    {
        document.querySelector('#results_feedback').innerText = 'Bad luck... The correct answer was ' + game_status['word'][game_status.active];
    }

    /* Update stats here */

    /* Reset share button */
    document.querySelector('#share').innerHTML = 'Share <i class="fa-solid fa-share"></i>'

    resultsModal.show();
} 

function share()
{
    let shareText = 'Wordle-2.0 (' + game_status.active + ' letters)\n\n';
    
    if (row < game_status.active)
    {
        shareText += (row + 1) + '/' + (game_status.active + 1);
    }
    else
    {
        shareText += 'X/' + (game_status.active + 1);
    }

    shareText += '\n';

    for (let i = 0; i <= Math.min(row, game_status.active); i++)
    {
        shareText += '\n';
        
        document.querySelectorAll('.game-row')[i].querySelectorAll('.game-column').forEach((letter) => {
            if (letter.classList.contains('correct-place'))
            {
                shareText += '🟩';
            }
            else if (letter.classList.contains('wrong-place'))
            {
                shareText += '🟨';
            }
            else
            {
                shareText += '⬜';
            }
        });
    }

    navigator.clipboard.writeText(shareText);
}

document.querySelector('#share').addEventListener('click', share);
document.querySelector('#share').addEventListener('mousedown', function() {
    document.querySelector('#share').innerHTML = 'Copied <i class="fa-solid fa-check"></i>'
});