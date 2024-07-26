document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab__content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            const isActive = tab.classList.contains('tab_active');

            // Удаляем класс активной вкладки у всех вкладок
            tabs.forEach(tab => tab.classList.remove('tab_active'));
            // Добавляем класс активной вкладке, на которую кликнули, если она не активна
            if (!isActive) {
                tab.classList.add('tab_active');
            }

            // Удаляем класс активного содержимого у всех вкладок
            tabContents.forEach(content => content.classList.remove('tab__content_active'));
            // Добавляем класс активному содержимому, соответствующему вкладке, если вкладка не активна
            if (!isActive) {
                tabContents[index].classList.add('tab__content_active');
            }
            // Иначе скрываем содержимое вкладки
            else {
                tabContents[index].classList.remove('tab__content_active');
            }
        });
    });
});