"use strict"

const bookControl = document.querySelector(".book__control");// получаю контейнер управления размером шрифтов из DOM
const fontSize = document.querySelectorAll(".font-size");// кнопки с размерами шрифта из DOM
const bookContent = document.querySelector(".book__content");//контент книги, у которого надо поменять шрифт

function changeTextSize(event) {
    event.preventDefault(); //предотвращения стандартного поведения элемента или браузера при возникновении события
    const clickFont = event.target;//
    const size = clickFont.dataset.size;
    const classToAdd = `font-size_${size}`;

    if(clickFont.classList.contains("font-size_active")){
        return;
    }

    Array.from(fontSize).forEach((item) => {
        item.classList.remove("font-size_active");
    });
    
    clickFont.classList.add("font-size_active");

    bookContent.classList.remove("font-size_small", "font-size_active", "font-size_big");

    if(size !== undefined){
        bookContent.classList.add(classToAdd);
    } else {
        bookContent.classList.add("font-size_active");
    }

    console.log(size, bookContent)
    
    




}
bookControl.addEventListener("click", changeTextSize);
