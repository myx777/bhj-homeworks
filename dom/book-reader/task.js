"use strict"

const fontSize = document.querySelectorAll(".font-size");// кнопки с размерами шрифта из DOM
const bookContent = document.querySelector(".book__content");//контент книги, у которого надо поменять шрифт
const color = document.querySelectorAll(".color");//класс колор, который используется в цвете текста и в фоне
const bookControlFontSize = document.querySelector(".book__control_font-size");//контейнер размер шрифта
const bookControlColor = document.querySelector(".book__control_color");//контейнер цвета текста
const bookControlBackground = document.querySelector(".book__control_background");//контейнер цвета фона

function changeTextSize(event){
    event.preventDefault(); //предотвращения стандартного поведения элемента или браузера при возникновении события
    const clickFont = event.target;//получаю элемент на который кликнул
    const size = clickFont.dataset.size; //получаю значение data-size
    const classToAdd = `font-size_${size}`;//формирую шаблон для дальнейшего добавления в класс с переменной, полученной ранее, в зависимости от того, что кликнуто

    if(clickFont.classList.contains("font-size_active")){//проверяю наличие класса у выбранного элемента
        return;
    }
    Array.from(fontSize).forEach((item) => {//удаляю все классы, чтобы они не копились при каждом клике и делаю явное преобразование в массив
        item.classList.remove("font-size_active");
    });
    
    clickFont.classList.add("font-size_active");//добавляю нужный клас на элементе, по которому кликнули
    bookContent.classList.remove("font-size_small", "font-size_active", "font-size_big");//удаляю все размеры шрифтов, чтобы на каждом клике не копировались, а обновлялись

    if(size){//проверяю, если есть размер в data-sixe у кликнутого элемента, то добавляю его   
        bookContent.classList.add(classToAdd);
    }
}

//далее по аналогии, решил разбить на 3 функции для лучшей управляемости
function textColor (event){
    event.preventDefault();
    const clickTextColor = event.target;
    const clickColor = clickTextColor.dataset.textColor;

    if(clickTextColor.classList.contains("color_active")) return;
    [...color].forEach((item) => {//преобразование в массив с помощью спред оператора
        item.classList.remove("color_active");
    });

    clickTextColor.classList.add("color_active");
    bookContent.classList.remove("style");//удаляю все стили текста, чтобы не копились
    if(clickColor){
        bookContent.style.color = clickColor;//так как надо поменять цвет текста то добавляю стиль к текту, а не класс
    }
}

function backgroundColor(event){
    event.preventDefault();
    const clickBackgrund = event.target;
    const backgrund = clickBackgrund.dataset.bgColor;
    const classToAdd = `bg_color_${backgrund}`;

    if(clickBackgrund.classList.contains("color_active")) return;
    [...color].forEach((item) => {
        item.classList.remove("color_active");
    });

    clickBackgrund.classList.add("color_active");
    bookContent.classList.remove("bg_color_white", "bg_color_gray", "bg_color_black");
    if(backgrund){
        bookContent.classList.add(classToAdd);
    }
}

bookControlFontSize.addEventListener("click", changeTextSize);//обработчик на клики
bookControlColor.addEventListener("click", textColor);
bookControlBackground.addEventListener("click", backgroundColor);