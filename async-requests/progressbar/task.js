document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    if (!file) {
        alert('Пожалуйста, выберите файл для загрузки.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    const progress = document.getElementById('progress');

    // Обработчик события загрузки
    xhr.upload.addEventListener('progress', function (e) {
        if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            progress.value = percentComplete; // Обновляем значение прогресса
        }
    });

    //работчик события завершения загрузки
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('Файл успешно загружен!');
            progress.value = 100; // Установим прогресс на 100%
        } else {
            alert('Произошла ошибка при загрузке файла.');
        }
    };

    // Отправка формы
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData);
});
