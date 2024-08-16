// task.js
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
const API_URL = 'https://students.netoservices.ru/nestjs-backend/poll';

// Функция для получения данных опроса
async function fetchPoll() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }
        const data = await response.json();
        renderPoll(data);
    } catch (error) {
        console.error('Ошибка при получении опроса:', error);
        alert('Не удалось загрузить опрос. Пожалуйста, попробуйте позже.');
    }
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
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `vote=${voteId}&answer=${answerIndex}`
        });

        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }

        const result = await response.json();
        alert('Спасибо, ваш голос засчитан!'); // Сообщение после голосования
        showResults(result.stat); // Показ результатов голосования
    } catch (error) {
        console.error('Ошибка при отправке голоса:', error);
        alert('Не удалось отправить ваш голос. Пожалуйста, попробуйте позже.');
    }
}

// Функция для отображения результатов голосования
function showResults(stat) {
    pollAnswers.innerHTML = ''; // Очистка предыдущих ответов
    stat.forEach(item => {
        const result = document.createElement('div');
        result.textContent = `${item.answer}: ${item.votes} голосов`;
        pollAnswers.appendChild(result);
    });
}

// Загрузка опроса при загрузке страницы
fetchPoll();
