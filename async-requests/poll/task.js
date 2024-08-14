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
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `vote=${voteId}&answer=${answerIndex}`
    });

    alert('Спасибо, ваш голос засчитан!'); // Сообщение после голосования
    showResults(); // Показ результатов голосования
}

// Функция для получения и отображения результатов голосования
async function showResults() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const totalVotes = data.stat.reduce((acc, item) => acc + item.votes, 0);

    pollAnswers.innerHTML = ''; // Очистка предыдущих ответов
    data.stat.forEach(item => {
        const percentage = totalVotes ? ((item.votes / totalVotes) * 100).toFixed(2) : 0;
        const result = document.createElement('div');
        result.textContent = `${item.answer}: ${percentage}% (${item.votes} голосов)`;
        pollAnswers.appendChild(result);
    });

    // Задержка перед загрузкой следующего опроса
    setTimeout(fetchPoll, 2000); // Загрузить новый опрос через 2 секунды
}

// Загрузка опроса при загрузке страницы
fetchPoll();