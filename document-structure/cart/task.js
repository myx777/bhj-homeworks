const product = document.querySelectorAll(".product");//псевдомассив карточек с продуктами
const cartProducts = document.querySelector(".cart__products");//псевдомассив карточек в корзине, HTML разметку которых буду вставлять при клике на корзину
const cartProductsToBasket = document.querySelectorAll(".cart__products");//псевдомассив из карточек из корзины (когда нои туда будут добавлены)

if(!document.querySelector(".cart__product")){//если в корзине пусто
    document.querySelector(".cart").style.display = "none";//прячу корзину
}

function createCartProduct(productId, productImageLink, counter) {//функция-заготовка HTML разметки товаров в корзине, с шаблонамиЖ id карточки, link на картинку и количество
    return `
        <div class="cart__product" data-id="${productId}">
            <img class="cart__product-image" src="${productImageLink}">
            <div class="cart__product-count">${counter}</div>
            <div class="product__reduce">Удалить</div>  
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
        document.querySelector(".cart").style.display = "block";//отрисовываю корзину
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

    if(!clickAdd && !clickReduce && !addBasket) {//проверка, чтобы нажимались только кнопки, в других местах обработчик прекращает выполнение кода
        return;
    }
    if(counter <= 0) {
        return;
    }    
    if (clickAdd) {//если кликнули на кнопку с +
        counter++;//то прибавляю 1
    } 
    if (clickReduce) {//тоже самое, только уменьшаю
        counter--;
    } 
    if (addBasket) {//при клике на кнопку добавить в корзину
        addProductToCart(productId, productImageLink, counter);//запускаю функцию добавления в HTML разметку корзины с карточкой товара 
    } 
    
    productValue.textContent = counter;//присваиваю в HTML разметку количество, которое получилолсь в счетчике после всех кликов
}

function reduceProductToCart(event){//функция удаления товара из корзины
    const removeProduct = event.target.closest(".product__reduce"); // Находим кнопку "Удалить"
    if(!removeProduct) return;//проверка, чтобы только на удалить нажималось
    if (removeProduct) {//если кликнул на удалить
        const cartProduct = removeProduct.closest(".cart__product"); // находим ближайший .cart__product
        cartProduct.remove(); // и удаляем найденный .cart__product
    }
    if(!document.querySelector(".cart__product")){//если в корзине пусто
        document.querySelector(".cart").style.display = "none";//снова прячу корзину
    }
}

[...product].forEach(item => {//перебираю все карточки твора с явным преобразованием псевдо массива в массив
    item.addEventListener("click", handleProductClick);// и на каждой карточке товара запускаю обработчик события клик
});

[...cartProductsToBasket].forEach(item => {//перебираю все карточки товара в корзине с явным преобразованием псевдо массива в массив
    item.addEventListener("click", reduceProductToCart);// и на каждой карточке товара в корзине запускаю обработчик события клик и функцию удаления
});