"use strict"//строгий режим

const reveal = document.querySelectorAll(".reveal");

function checkRevealElements() {//функция для обработчика события
  [...reveal].forEach((item) => {
    const { top } = item.getBoundingClientRect();
        (top <= 400 && top >= 0) ? item.classList.add("reveal_active") : 
            item.classList.remove("reveal_active");   
    });
}

// Обработчик события scroll
window.addEventListener("scroll", checkRevealElements);

// Вызываем функцию при  первоначальной загрузки страницы для проверки видимости элементов
checkRevealElements();
