// Получаем элементы корзины и всех товаров
const cartProductsContainer = document.querySelector('.cart__products');
const cartTitle = document.querySelector('.cart__title');
const products = document.querySelectorAll('.product');

// Функция для обновления отображения корзины
function updateCartVisibility() {
    if (cartProductsContainer.children.length > 0) {
        cartTitle.style.display = 'block';
    } else {
        cartTitle.style.display = 'none';
    }
}

// Обработчик события для каждого товара
products.forEach(product => {
    const quantityValue = product.querySelector('.product__quantity-value');
    const quantityControlInc = product.querySelector('.product__quantity-control_inc');
    const quantityControlDec = product.querySelector('.product__quantity-control_dec');
    const addToCartButton = product.querySelector('.product__add');

    // Увеличиваем количество
    quantityControlInc.addEventListener('click', () => {
        quantityValue.textContent = parseInt(quantityValue.textContent) + 1;
    });

    // Уменьшаем количество, но не ниже 1
    quantityControlDec.addEventListener('click', () => {
        if (parseInt(quantityValue.textContent) > 1) {
            quantityValue.textContent = parseInt(quantityValue.textContent) - 1;
        }
    });

    // Добавляем товар в корзину
    addToCartButton.addEventListener('click', () => {
        const productId = product.dataset.id;
        const productImage = product.querySelector('.product__image').src;
        const productCount = parseInt(quantityValue.textContent);

        // Проверяем, есть ли товар уже в корзине
        let cartProduct = cartProductsContainer.querySelector(`.cart__product[data-id="${productId}"]`);

        if (cartProduct) {
            // Если товар есть, обновляем количество
            const countElement = cartProduct.querySelector('.cart__product-count');
            countElement.textContent = parseInt(countElement.textContent) + productCount;
        } else {
            // Если товара нет, создаем новый элемент корзины
            cartProduct = document.createElement('div');
            cartProduct.classList.add('cart__product');
            cartProduct.dataset.id = productId;

            // Создаем изображение товара в корзине
            const img = document.createElement('img');
            img.classList.add('cart__product-image');
            img.src = productImage;

            // Создаем элемент для количества товара
            const countElement = document.createElement('div');
            countElement.classList.add('cart__product-count');
            countElement.textContent = productCount;

            // Создаем кнопку для удаления товара
            const removeButton = document.createElement('div');
            removeButton.classList.add('cart__product-remove');
            removeButton.textContent = 'Удалить';
            removeButton.style.cursor = 'pointer';
            removeButton.style.color = 'red';

            // Удаляем товар из корзины
            removeButton.addEventListener('click', () => {
                cartProduct.remove();
                updateCartVisibility();
            });

            // Собираем элемент корзины
            cartProduct.appendChild(img);
            cartProduct.appendChild(countElement);
            cartProduct.appendChild(removeButton);
            cartProductsContainer.appendChild(cartProduct);
        }

        // Обновляем видимость корзины
        updateCartVisibility();
    });
});

// Изначально скрываем заголовок корзины, если она пуста
updateCartVisibility();
