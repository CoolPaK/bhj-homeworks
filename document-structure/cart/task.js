// Получаем элементы корзины и всех товаров
const cartProductsContainer = document.querySelector('.cart__products');
const cartTitle = document.querySelector('.cart__title');
const products = document.querySelectorAll('.product');

// Функция для обновления отображения корзины
function updateCartVisibility() {
    cartTitle.style.display = cartProductsContainer.children.length > 0 ? 'block' : 'none';
}

// Функция для создания элемента товара в корзине
function createCartProductElement(productId, productImage, productCount) {
    return `
        <div class="cart__product" data-id="${productId}">
            <img class="cart__product-image" src="${productImage}">
            <div class="cart__product-count">${productCount}</div>
            <div class="cart__product-remove" style="cursor: pointer; color: red;">Удалить</div>
        </div>
    `;
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
            const newCartProductHTML = createCartProductElement(productId, productImage, productCount);
            cartProductsContainer.insertAdjacentHTML('beforeend', newCartProductHTML);
            cartProduct = cartProductsContainer.lastElementChild;

            // Удаляем товар из корзины
            const removeButton = cartProduct.querySelector('.cart__product-remove');
            removeButton.addEventListener('click', () => {
                cartProduct.remove();
                updateCartVisibility();
            });
        }

        // Обновляем видимость корзины
        updateCartVisibility();
    });
});

// Изначально скрываем заголовок корзины, если она пуста
updateCartVisibility();