// Получаем все элементы с классом "has-tooltip"
const tooltipTriggers = document.querySelectorAll('.has-tooltip');

// Функция для показа подсказки
function showTooltip(event) {
    // Создаем элемент подсказки
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = this.getAttribute('title');

    // Определяем положение подсказки
    const position = this.getAttribute('data-position') || 'top';
    tooltip.classList.add(`tooltip--${position}`);

    // Добавляем подсказку в DOM
    this.appendChild(tooltip);

    // Добавляем класс, чтобы показать подсказку
    this.classList.add('tooltip_active');

    // Обработчик события, чтобы скрыть подсказку при клике вне ее
    document.addEventListener('click', hideTooltip);
}

// Функция для скрытия подсказки
function hideTooltip(event) {
    // Проверяем, был ли клик внутри подсказки
    if (!event.target.closest('.tooltip')) {
        // Скрываем все активные подсказки
        const activeTooltips = document.querySelectorAll('.tooltip_active');
        activeTooltips.forEach(tooltip => {
            tooltip.classList.remove('tooltip_active');
            tooltip.querySelector('.tooltip').remove();
        });

        // Удаляем обработчик события
        document.removeEventListener('click', hideTooltip);
    }
}

// Добавляем обработчик события клика на все элементы с классом "has-tooltip"
tooltipTriggers.forEach(trigger => {
    trigger.addEventListener('click', showTooltip);
});