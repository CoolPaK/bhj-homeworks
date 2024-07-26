document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab__content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Удаляем класс активной вкладки у всех вкладок
            tabs.forEach(tab => tab.classList.remove('tab_active'));
            // Добавляем класс активной вкладке, на которую кликнули
            tab.classList.add('tab_active');

            // Удаляем класс активного содержимого у всех вкладок
            tabContents.forEach(content => content.classList.remove('tab__content_active'));
            // Добавляем класс активному содержимому, соответствующему вкладке
            tabContents[index].classList.add('tab__content_active');
        });
    });
});