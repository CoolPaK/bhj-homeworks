// Получаем все элементы с классом reveal
const revealElements = document.querySelectorAll('.reveal');

// Функция для проверки видимости элемента и добавления класса reveal_active
function checkVisibility() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom >= 0) {
            element.classList.add('reveal_active');
        } else {
            element.classList.remove('reveal_active');
        }
    });
}

// Слушаем событие прокрутки окна и вызываем функцию проверки видимости
window.addEventListener('scroll', checkVisibility);

// Вызываем функцию при загрузке страницы, чтобы показать элементы, которые сразу видны
checkVisibility();