document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signin__form');
    const welcomeDiv = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');
    const signinDiv = document.getElementById('signin');

    // Проверка наличия user_id в локальном хранилище
    const userId = localStorage.getItem('user_id');
    if (userId) {
        showWelcome(userId);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        const formData = new FormData(form);

        // Отправка POST-запроса с использованием fetch
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Успешная авторизация
                    localStorage.setItem('user_id', data.user_id); // Сохранение user_id в локальном хранилище
                    showWelcome(data.user_id);
                } else {
                    // Ошибка авторизации
                    alert('Неверный логин/пароль');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    });

    function showWelcome(userId) {
        // Отображение блока приветствия
        signinDiv.classList.remove('signin_active');
        welcomeDiv.classList.add('welcome_active');
        userIdSpan.textContent = userId; // Установка id пользователя
    }

    // Добавление функции для деавторизации
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Выйти';
    logoutButton.classList.add('btn');
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('user_id'); // Удаление user_id из локального хранилища
        welcomeDiv.classList.remove('welcome_active');
        signinDiv.classList.add('signin_active');
        form.reset(); // Очистка формы
    });

    // Добавление кнопки выхода на страницу
    welcomeDiv.appendChild(logoutButton);
});