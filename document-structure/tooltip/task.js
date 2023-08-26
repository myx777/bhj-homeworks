"use strict"

const hasToolTip = document.querySelectorAll(".has-tooltip");
let activeToolTip = null;

function openToolTip(event) {
    const chooseToolTip = event.target.closest(".has-tooltip");
    
    if (activeToolTip && activeToolTip !== chooseToolTip) {// Если есть активная подсказка и кликнули на другую подсказку
        activeToolTip.nextElementSibling.remove(); // удаляем активную подсказку, т.е следующий элемент, после ссылки (подсказку,которую создал)
        activeToolTip = null; // Сбрасываем активную подсказку

    } else if (activeToolTip) { // если есть активная подсказка и кликнули на эту подсказку  
        activeToolTip.nextElementSibling.remove();
        activeToolTip = null; 
        return; // Прекращаем выполнение функции
    }

    if (chooseToolTip) {
        const textToolTip = chooseToolTip.title;
        chooseToolTip.insertAdjacentHTML('afterend', addHtml(textToolTip));
        activeToolTip = chooseToolTip; // Устанавливаем текущую активную подсказку
        const newToolTip = chooseToolTip.nextElementSibling;
        newToolTip.classList.add("tooltip_active");
        const coords = chooseToolTip.getBoundingClientRect();//определяю координаты
        newToolTip.style.left = coords.left + "px";
        newToolTip.style.top = coords.bottom + "px";
    }
}

function addHtml(textToolTip) {
    return `
    <div class="tooltip">${textToolTip}</div>
    `;
}

hasToolTip.forEach((item) => {
    item.addEventListener("click", (event) => {
        event.preventDefault();
        openToolTip(event);
    });
});