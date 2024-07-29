document.addEventListener('DOMContentLoaded', function () {
    let score = 0;
    let misses = 0;
    const holes = document.querySelectorAll('.hole');

    function getHole(index) {
        return document.getElementById(`hole${index}`);
    }

    function whackMole(e) {
        if (e.target.classList.contains('hole_has-mole')) {
            score++;
        } else {
            misses++;
        }

        if (score === 10) {
            alert('Победа! Вы победили кротов!');
            score = 0;
            misses = 0;
        }

        if (misses === 5) {
            alert('Игра окончена! Вы проиграли.');
            score = 0;
            misses = 0;
        }
    }

    holes.forEach((hole, index) => {
        hole.addEventListener('click', whackMole);
    });
});
