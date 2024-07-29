const timerElement = document.getElementById('timer');

let timer = 59;

function updateTimer() {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timer--;

    if (timer < 0) {
        clearInterval(intervalId);
        alert('Вы победили в конкурсе!');
    }

}

const intervalId = setInterval(updateTimer, 1000);