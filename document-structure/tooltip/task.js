document.addEventListener('DOMContentLoaded', function () {
    const tooltipElements = document.querySelectorAll('.has-tooltip');
    let currentTooltipElement = null;

    function showTooltip(event) {
        const tooltipElement = event.currentTarget.querySelector('.tooltip');
        if (tooltipElement) {
            const {
                x,
                y,
                width,
                height
            } = event.currentTarget.getBoundingClientRect();
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