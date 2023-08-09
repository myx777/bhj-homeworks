const product = document.querySelectorAll(".product");//псевдомассив карточек с продуктами
const cartProducts = document.querySelector(".cart__products");//псевдомассив карточек в корзине, HTML разметку которых буду вставлять при клике на корзину

function createCartProduct(productId, productImageLink, counter) {//функция-заготовка HTML разметки товаров в корзине, с шаблонамиЖ id карточки, link на картинку и количество
    return `
        <div class="cart__product" data-id="${productId}">
            <img class="cart__product-image" src="${productImageLink}">
            <div class="cart__product-count">${counter}</div>
        </div>
    `;
}

function updateCartProductCounter(cartProduct, counter) {//функция добавления количество товара, когда товар уже в корзине
    const cartProductCount = cartProduct.querySelector(".cart__product-count");//получаю количество товара из карточки определенного товара
    const currentCount = parseInt(cartProductCount.textContent);//явное преобразование существующего уже количество товара в целое число
    cartProductCount.textContent = currentCount + counter;//добавление к существаующему количеству товара, то что дополнительно накликали, когда товар в корзине
}

function addProductToCart(productId, productImageLink, counter) {//функция добавления карточки товара в корзину, если еще он не был добавлен
    const cartProduct = document.querySelector(`.cart__product[data-id="${productId}"]`);//получаю карточку товара с имеющимся id
    if (cartProduct) {//если карточка с таким id существует
        updateCartProductCounter(cartProduct, counter);//то запускаю функция добавления количества товара к имеющемуся и запрещаю дублирование карточки
    } else {//нет карточки с таким id
        cartProducts.insertAdjacentHTML('beforeend', createCartProduct(productId, productImageLink, counter));//то добавляю карточку
    }
}

function handleProductClick(event) {//функция добавления/уменьшения количества товара при клике
    const clickAdd = event.target.closest(".product__quantity-control_inc");//получаю кнопку увеличения (на которую кликнули)
    const clickReduce = event.target.closest(".product__quantity-control_dec");//тоже самое, только уменьшения
    const addBasket = event.target.closest(".product__add");//кнопка добавить в корзину, на которую кликнули
    const product = event.currentTarget;//определяю текущую карточку на которой сработал обработчик события
    const productValue = product.querySelector(".product__quantity-value");//определяю из активной карточки продукта количество
    const productId = product.dataset.id;//определяю из активной карточки продукта id
    const productImage = product.querySelector(".product__image");//определяю из активной карточки продукта картинку
    const productImageLink = productImage.getAttribute("src");//а теперь ссылку на картинку
    
    let counter = parseInt(productValue.textContent);//назначаю счетчик с явным преобразованием в целое число из уже имеющегося количества товара

    if (clickAdd) {//если кликнули на кнопку с +
        counter++;//то прибавляю 1
    } else if (clickReduce) {//тоже самое, только уменьшаю
        counter--;
    } else if (addBasket) {//при клике на кнопку добавить в корзину
        addProductToCart(productId, productImageLink, counter);//запускаю функцию добавления в HTML разметку корзины с карточкой товара 
    } else {//если клик бы не на кнопках, то завершаю обработчик без выполнения другого кода
        return;
    }

    if (counter < 0) {//запрещаю выбор ниже 0
        return;
    }
    
    productValue.textContent = counter;//присваиваю в HTML разметку количество, которое получилолсь в счетчике после всех кликов
    console.log( event )
}

[...product].forEach(item => {//перебираю все карточки твора с явным преобразованием псевдо массива в массив
    item.addEventListener("click", handleProductClick);// и на каждой карточке товара запускаю обработчик события клик
});