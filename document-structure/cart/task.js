
const product = document.querySelectorAll(".product");
const cartProducts = document.querySelector(".cart__products");

product.forEach(item => {//начинаю с перебора всех карточек продукта
    const productValue = item.querySelector(".product__quantity-value");//количество выбраного продукта из выбранного элемента (карточки продукта)
    const productId = item.dataset.id;//id продукта выбранного элемента
    let counter = 1;//счетчик

    function getListContent (productId, counter, productImageLink){//функция добавления кода в html (корзина)
        /*
        создаю сей код с добавлением нужных переменных в виде шаблонов
               
        <div class="cart__product" data-id="1">
            <img class="cart__product-image" src="image.png">
            <div class="cart__product-count">20</div>
          </div> 
         */

        const cartProduct = document.querySelector(`.cart__product[data-id="${productId}"]`);//контейнер карточки товара из DOM с учетом ID (в виде шаблона)

        if (cartProduct) {//если карта с таким же id  существует
            const cartProductCount = cartProduct.querySelector(".cart__product-count");//количество товара из контейнера с карточки товара с тем же id
            const currentCount = parseInt(cartProductCount.textContent);//явно преобразую строку в целое число
            cartProductCount.textContent = currentCount + counter;//добавляю к имеющемуся количеству то число, которое накликали
        } else {//если карточки товара с таким id нет, то создаю разметку с шаблонами на id, ссылки на картинку, количеством выбранного товара
            cartProducts.insertAdjacentHTML('beforeend', `<div class="cart__product" data-id="${productId}">
                <img class="cart__product-image" src="${productImageLink}">
                <div class="cart__product-count">${counter}</div>
                </div>`
            );
        }
    }
 
    function clickItem(event) {//функция, которая будет добавлена в обработчик
        const clickAdd = event.target.closest(".product__quantity-control_inc");//близжайший родитель для увеличения количества
        const clickReduce = event.target.closest(".product__quantity-control_dec");//близжайший родитель для уменьшения количества
        const addBasket = event.target.closest(".product__add");//кнопка корзина
        const productImage = item.querySelector(".product__image");//картинка
        const productImageLink = productImage.getAttribute("src");//пролучаю ссылку на картинку

        if(clickAdd){//если клик на + то добавляю 1
            counter++;
        }

        if(clickReduce){//тоже самое на -
            counter--;
        } 

        if(counter < 0) {// проверка, недопущение уменьшение ниже 0         
            alert( `Подарков нет!` );
            return;
        }
    
        productValue.textContent = counter;//присваиваю значения счетчика

        if (addBasket) { // добавить товар в корзину
            getListContent(productId, counter, productImageLink);
        }

    }

    item.addEventListener("click", clickItem);//обработчик на клик
    
});