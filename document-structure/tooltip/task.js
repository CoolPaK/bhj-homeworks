document.addEventListener('DOMContentLoaded', function () {
    // Получаем все элементы с классом .has-tooltip
    const tooltipElements = document.querySelectorAll('.has-tooltip');

    // Переменная для отслеживания текущего отображаемого элемента подсказки
    let currentTooltipElement = null;

    // Функция для отображения подсказки
    function showTooltip(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        // Получаем элемент подсказки
        const tooltipElement = event.currentTarget.querySelector('.tooltip');

        if (tooltipElement) {
            // Получаем позицию и размеры элемента
            const { x, y, width, height } = event.currentTarget.getBoundingClientRect();

            // Получаем положение подсказки из атрибута data-position или используем значение по умолчанию 'top'
            const tooltipPosition = event.currentTarget.getAttribute('data-position') || 'top';

            // Вычисляем координаты для отображения подсказки в зависимости от ее положения
            let tooltipX, tooltipY;
            switch (tooltipPosition) {
                case 'top':
                    tooltipX = x + width / 2 - tooltipElement.offsetWidth / 2;
                    tooltipY = y - tooltipElement.offsetHeight - 10;
                    break;
                case 'left':
                    tooltipX = x - tooltipElement.offsetWidth - 10;
                    tooltipY = y + height / 2 - tooltipElement.offsetHeight / 2;
                    break;
                case 'right':
                    tooltipX = x + width + 10;
                    tooltipY = y + height / 2 - tooltipElement.offsetHeight / 2;
                    break;
                case 'bottom':
                    tooltipX = x + width / 2 - tooltipElement.offsetWidth / 2;
                    tooltipY = y + height + 10;
                    break;
            }

            // Проверяем, чтобы подсказка не выходила за пределы экрана
            const maxX = window.innerWidth - tooltipElement.offsetWidth - 10;
            const maxY = window.innerHeight - tooltipElement.offsetHeight - 10;
            tooltipX = Math.min(Math.max(tooltipX, 10), maxX);
            tooltipY = Math.min(Math.max(tooltipY, 10), maxY);

            // Устанавливаем позицию подсказки и добавляем класс активности
            tooltipElement.style.left = `${tooltipX}px`;
            tooltipElement.style.top = `${tooltipY}px`;
            tooltipElement.classList.add('tooltip_active');

            // Скрываем предыдущую подсказку, если она была
            if (currentTooltipElement && currentTooltipElement !== tooltipElement) {
                currentTooltipElement.classList.remove('tooltip_active');
            }

            // Обновляем текущий отображаемый элемент подсказки
            currentTooltipElement = tooltipElement;
        }
    }

    // Функция для скрытия подсказки
    function hideTooltip() {
        if (currentTooltipElement) {
            currentTooltipElement.classList.remove('tooltip_active');
            currentTooltipElement = null;
        }
    }

    // Для каждого элемента с классом .has-tooltip:
    tooltipElements.forEach((element) => {
        // Создаем элемент подсказки и добавляем его в DOM
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = element.getAttribute('title');
        element.appendChild(tooltip);

        // Добавляем обработчик события клика для отображения подсказки
        element.addEventListener('click', showTooltip);
    });
});