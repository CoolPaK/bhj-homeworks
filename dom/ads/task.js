// Получаем все элементы с классом 'rotator'
const rotators = document.querySelectorAll('.rotator');

// Проходимся по каждому rotator
rotators.forEach(rotator => {

    // Получаем все дочерние элементы с классом 'rotator__case'
    const cases = rotator.querySelectorAll('.rotator__case');

    // Устанавливаем начальный индекс текущего активного элемента
    let currentIndex = 0;

    // Устанавливаем интервал смены текстовых блоков каждую секунду
    setInterval(() => {

        // Удаляем класс 'rotator__case_active' у текущего активного элемента
        cases[currentIndex].classList.remove('rotator__case_active');

        // Вычисляем индекс следующего активного элемента, учитывая кольцевую смену
        currentIndex = (currentIndex + 1) % cases.length;

        // Добавляем класс 'rotator__case_active' к следующему активному элементу
        cases[currentIndex].classList.add('rotator__case_active');

        // Получаем скорость смены текста и цвет текста из data-атрибутов или устанавливаем значения по умолчанию
        const speed = cases[currentIndex].dataset.speed || 1000;
        const color = cases[currentIndex].dataset.color || 'black';

        // Устанавливаем переход цвета текста с учетом скорости
        cases[currentIndex].style.transition = `color ${speed / 1000}s`;

        // Устанавливаем цвет текста
        cases[currentIndex].style.color = color;

    }, 1000);


});