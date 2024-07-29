document.addEventListener('DOMContentLoaded', function () {
    let score = 0;
    let misses = 0;
    const holes = document.querySelectorAll('.hole');
    const scoreDisplay = document.getElementById('score');
    const missesDisplay = document.getElementById('misses');

    function getHole(index) {
        return document.getElementById(`hole${index}`);
    }

    function whackMole(e) {
        if (e.target.classList.contains('hole_has-mole')) {
            score++;
            scoreDisplay.textContent = score;
        } else {
            misses++;
            missesDisplay.textContent = misses;
        }

        if (score === 10) {
            alert('Победа! Вы победили кротов!');
            score = 0;
            misses = 0;
            scoreDisplay.textContent = score;
            missesDisplay.textContent = misses;
        }

        if (misses === 5) {
            alert('Игра окончена! Вы проиграли.');
            score = 0;
            misses = 0;
            scoreDisplay.textContent = score;
            missesDisplay.textContent = misses;
        }
    }

    holes.forEach((hole, index) => {
        hole.addEventListener('click', whackMole);
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('hole-game')) {
            score = 0;
            misses = 0;
            scoreDisplay.textContent = score;
            missesDisplay.textContent = misses;
        }
    });
});
