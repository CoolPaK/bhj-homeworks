document.addEventListener('DOMContentLoaded', function () {
    let score = 0;
    let misses = 0;
    const deadDisplay = document.getElementById('dead');
    const lostDisplay = document.getElementById('lost');
    const holes = document.querySelectorAll('.hole');

    function getHole(index) {
        return document.getElementById(`hole${index}`);
    }

    function whackMole(e) {
        if (e.target.classList.contains('hole_has-mole')) {
            score++;
            deadDisplay.textContent = score;
        } else {
            misses++;
            lostDisplay.textContent = misses;
        }

        if (score === 10) {
            endGame('Победа! Вы победили кротов!');
        }

        if (misses === 5) {
            endGame('Игра окончена! Вы проиграли.');
        }
    }

    function endGame(message) {
        alert(message);
        score = 0;
        misses = 0;
        deadDisplay.textContent = score;
        lostDisplay.textContent = misses;
    }

    holes.forEach((hole, index) => {
        hole.addEventListener('click', whackMole);
    });
});