// task.js
const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');
const API_URL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
const CACHE_KEY = 'currencyData';
const CACHE_EXPIRY = 60000; // 1 минута

async function fetchCurrencyData() {
    loader.classList.add('loader_active'); // Показать анимацию загрузки
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

    // Проверка кэша
    if (cachedData && (Date.now() - cachedData.timestamp < CACHE_EXPIRY)) {
        renderCurrencyData(cachedData.data);
    } else {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data: data.response.Valute, timestamp: Date.now() }));
            renderCurrencyData(data.response.Valute);
        } catch (error) {
            console.error('Ошибка при загрузке данных: ', error);
        }
    }
    loader.classList.remove('loader_active'); // Скрыть анимацию загрузки
}

function renderCurrencyData(valute) {
    itemsContainer.innerHTML = ''; // Очистка контейнера
    for (const key in valute) {
        const { CharCode, Value } = valute[key];
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <div class="item__code">${CharCode}</div>
            <div class="item__value">${Value.toFixed(2)}</div>
            <div class="item__currency">руб.</div>
        `;
        itemsContainer.appendChild(item);
    }
}

// Первоначальная загрузка данных
fetchCurrencyData();

// Обновление данных каждую минуту
setInterval(fetchCurrencyData, 60000);