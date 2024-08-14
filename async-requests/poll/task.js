// task.js
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
const API_URL = 'https://students.netoservices.ru/nestjs-backend/poll';

// Функция для получения данных опроса
async function fetchPoll() {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderPoll(data);
}

// Функция для отображения опроса
function renderPoll(data) {
    pollTitle.textContent = data.data.title;
    pollAnswers.innerHTML = ''; // Очистка предыдущих ответов

    data.data.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'poll__answer';
        button.textContent = answer;
        button.onclick = () => submitVote(data.id, index);
        pollAnswers.appendChild(button);
    });
}

// Функция для отправки голосования
async function submitVote(voteId, answerIndex) {
    // Отправка голосования на сервер
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `vote=${voteId}&answer=${answerIndex}`
    });

    // Проверка успешности ответа
    if (response.ok) {
        alert('Спасибо, ваш голос засчитан!'); // Сообщение после голосования
        updateLocalResults(answerIndex); // Обновление результатов локально
        showResults(); // Показ результатов голосования
    } else {
        alert('Произошла ошибка при голосовании. Пожалуйста, попробуйте снова.');
    }
}

// Функция для обновления локальных результатов голосования
function updateLocalResults(answerIndex) {
    const resultElements = pollAnswers.querySelectorAll('div');
    const resultElement = resultElements[answerIndex];

    // Увеличиваем количество голосов для выбранного ответа
    const votesText = resultElement.textContent.match(/(\d+) голосов/);
    const currentVotes = votesText ? parseInt(votesText[1]) : 0;
    resultElement.textContent = `${resultElement.textContent.replace(/(\d+) голосов/, `${currentVotes + 1} голосов`)}`;
}

// Функция для получения и отображения результатов голосования
async function showResults() {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Очистка предыдущих результатов перед обновлением
    pollAnswers.innerHTML = '';
    data.stat.forEach(item => {
        const result = document.createElement('div');
        result.textContent = `${item.answer}: ${item.votes} голосов`;
        pollAnswers.appendChild(result);
    });
}

// Загрузка опроса при загрузке страницы
fetchPoll();
