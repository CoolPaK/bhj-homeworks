// Получаем элементы DOM
const timerElement = document.getElementById('timer');

// Устанавливаем стартовое значение таймера (в секундах)
let timer = 59;

// Функция обновления таймера
function updateTimer() {
    timerElement.textContent = timer;
    timer;
    if (timer < 0) {
        clearInterval(intervalId);
        alert('Вы победили в конкурсе!');
    }

}

// Вызываем функцию обновления таймера каждую секунду
const intervalId = setInterval(updateTimer, 1000);