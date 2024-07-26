// Находим все элементы с классом dropdown
const dropdowns = document.querySelectorAll('.dropdown');

// Перебираем найденные элементы

dropdowns.forEach(dropdown => {
    // Находим элементы внутри текущего dropdown
    const value = dropdown.querySelector('.dropdown__value');
    const list = dropdown.querySelector('.dropdown__list');
    const items = dropdown.querySelectorAll('.dropdown__item');

// При клике на значение открываем/закрываем список
value.addEventListener('click', () => {
    list.classList.toggle('dropdown__list_active');
});

// Перебираем все элементы списка и устанавливаем обработчик на каждый
items.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault(); // Предотвращаем переход по ссылке

        // Закрываем список
        list.classList.remove('dropdown__list_active');

        // Устанавливаем новое значение
        value.textContent = item.textContent.trim();
    });
});

});

