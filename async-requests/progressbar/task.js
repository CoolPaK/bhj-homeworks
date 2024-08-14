// Получаем элементы из DOM
let progress = document.getElementById('progress');
let form = document.getElementById('form');

// Обработчик событий для отправки формы
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    let input = form.elements.file;
    let file = input.files[0];

    if (file) {
        upload(file); // Загружаем файл, если он выбран
    } else {
        alert('Пожалуйста, выберите файл для загрузки.'); // Уведомление, если файл не выбран
    }
});

// Функция для загрузки файла
function upload(file) {
    let xhr = new XMLHttpRequest();

    // Обработчик события прогресса загрузки
    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            progress.setAttribute('max', event.total); // Устанавливаем максимальное значение
            progress.value = event.loaded; // Обновляем значение прогресса
        }
    };

    // Обработчик события завершения загрузки
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('Файл успешно загружен!'); // Уведомление об успешной загрузке
            progress.value = progress.getAttribute('max'); // Устанавливаем прогресс на 100%
        } else {
            alert('Произошла ошибка при загрузке файла: ' + xhr.statusText); // Уведомление об ошибке
        }
    };

    // Обработчик события ошибки
    xhr.onerror = function () {
        alert('Произошла ошибка во время загрузки.'); // Уведомление об ошибке
    };

    // Открываем соединение и отправляем файл
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(file);
}