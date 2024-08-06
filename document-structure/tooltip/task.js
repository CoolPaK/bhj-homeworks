document.addEventListener('DOMContentLoaded', function () {
    const tooltipElements = document.querySelectorAll('.has-tooltip');
    let currentTooltipElement = null;

    function showTooltip(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        const tooltipElement = event.currentTarget.querySelector('.tooltip');
        if (tooltipElement) {
            const { x, y, width, height } = event.currentTarget.getBoundingClientRect();
            const tooltipPosition = event.currentTarget.getAttribute('data-position') || 'top';
            let tooltipX, tooltipY;

            switch (tooltipPosition) {
                case 'top':
                    tooltipX = x + width / 2;
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
                    tooltipX = x + width / 2;
                    tooltipY = y + height + 10;
                    break;
            }

            // Проверяем, чтобы подсказка не выходила за пределы экрана
            const maxX = window.innerWidth - tooltipElement.offsetWidth - 10;
            const maxY = window.innerHeight - tooltipElement.offsetHeight - 10;
            tooltipX = Math.min(Math.max(tooltipX, 10), maxX);
            tooltipY = Math.min(Math.max(tooltipY, 10), maxY);

            tooltipElement.style.left = `${tooltipX}px`;
            tooltipElement.style.top = `${tooltipY}px`;
            tooltipElement.classList.add('tooltip_active');

            if (currentTooltipElement && currentTooltipElement !== tooltipElement) {
                currentTooltipElement.classList.remove('tooltip_active');
            }
            currentTooltipElement = tooltipElement;
        }
    }

    function hideTooltip() {
        if (currentTooltipElement) {
            currentTooltipElement.classList.remove('tooltip_active');
            currentTooltipElement = null;
        }
    }

    tooltipElements.forEach((element) => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = element.getAttribute('title');
        element.appendChild(tooltip);
        element.addEventListener('click', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
});