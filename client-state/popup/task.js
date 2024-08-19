// Функция для установки cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

// Функция для получения cookie
function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

// Функция для проверки наличия cookie
function checkModal() {
    const modal = document.getElementById('subscribe-modal');
    const modalClose = document.querySelector('.modal__close');

    // Проверяем, есть ли cookie, указывающее на закрытие окна
    if (!getCookie('modalClosed')) {
        // Если cookie нет, показываем модальное окно
        modal.classList.add('modal_active');
    }

    // Обработчик нажатия на кнопку закрытия
    modalClose.addEventListener('click', function () {
        modal.classList.remove('modal_active');
        // Устанавливаем cookie на 30 дней
        setCookie('modalClosed', 'true', 30);
    });
}

// Запускаем функцию проверки модального окна при загрузке страницы
window.onload = checkModal;