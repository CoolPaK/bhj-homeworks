// Получаем все необходимые элементы
const fontSizes = document.querySelectorAll('.font-size');
const textColors = document.querySelectorAll('.color.text_color_black, .color.text_color_gray, .color.text_color_whitesmoke');
const bgColors = document.querySelectorAll('.color.bg_color_black, .color.bg_color_gray, .color.bg_color_white');
const book = document.getElementById('book');

// Функция для смены размера шрифта
function changeFontSize(event) {
    event.preventDefault();

    fontSizes.forEach(item => item.classList.remove('font-size_active'));
    event.target.classList.add('font-size_active');

    book.classList.remove('book_fs-big', 'book_fs-small');
    if (event.target.dataset.size === 'small') {
        book.classList.add('book_fs-small');
    } else if (event.target.dataset.size === 'big') {
        book.classList.add('book_fs-big');
    }
}

// Функция для смены цвета текста
function changeTextColor(event) {
    event.preventDefault();

    textColors.forEach(item => item.classList.remove('color_active'));
    event.target.classList.add('color_active');

    book.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');
    book.classList.add(`book_color-${event.target.dataset.textColor}`);
}

// Функция для смены цвета фона
function changeBgColor(event) {
    event.preventDefault();

    bgColors.forEach(item => List.remove('color_active'));
    event.target.classList.add('color_active');

    book.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');
    book.classList.add(`book_bg-${event.target.dataset.bgColor}`);
}

// Добавляем обработчики событий
fontSizes.forEach(item => item.addEventListener('click', changeFontSize));
textColors.forEach(item => item.addEventListener('click', changeTextColor));
bgColors.forEach(item => item.addEventListener('click', changeBgColor));