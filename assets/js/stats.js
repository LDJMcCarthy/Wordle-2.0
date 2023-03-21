const statsModal = new bootstrap.Modal(document.querySelector('#stats'));

document.querySelector('#stats_button').addEventListener('click', function() {
    buildModal(7, document.querySelector('#stats .statistics_box'));

    statsModal.show();
});

function generateResultsStats(user_won)
{  
    buildModal(game_status.active + 1, document.querySelector('#results .statistics_box'));

    if (user_won)
    {
        document.querySelectorAll('#results .statistics_chart')[game_status.row].classList.add('active');
    }
}

function calculateStatWidths(numberOfLetters)
{
    max = 0;

    for (let i = 1; i <= numberOfLetters; i++)
    {
        if (game_status.stats[i] > max)
        {
            max = game_status.stats[i];
        }
    }

    let widths = {};

    for (let i = 1; i <= numberOfLetters; i++)
    {
        widths[i] = ((game_status.stats[i] / max) * 90) + 10;
    }

    return widths;
}

function buildModal(numberOfLetters, container)
{
    const widths = calculateStatWidths(numberOfLetters);

    container.innerHTML = ''

    for (let i = 1; i <= numberOfLetters; i++)
    {
        const stat = document.createElement('div');
        
        const label = document.createElement('div');
        label.classList.add('statistics_numbers');
        label.innerText = i;
        stat.appendChild(label);

        const bar = document.createElement('div');
        bar.classList.add('statistics_chart');
        bar.innerText = game_status.stats[i];
        bar.style.width = widths[i] + '%';
        stat.appendChild(bar);

        container.appendChild(stat);
    }

    document.querySelectorAll('.user_streak').forEach((element) => {
        element.innerText = game_status.streak;
    });
}