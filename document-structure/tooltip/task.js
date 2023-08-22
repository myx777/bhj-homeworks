"use strict"

const hasToolTip = document.querySelectorAll(".has-tooltip");//псевдомассив с подсказками
let activeToolTip = null;//создаю переменную, чтобы отслеживать статус подсказки, активен или нет

function openToolTip(event) {//функция отображения подсказки при клике
    const chooseToolTip = event.target.closest(".has-tooltip");//определяю на какую именно подсказку был клик

    activeToolTip = document.querySelector(".tooltip");//ищу активную подссказку с классом tooltip, так как при клике добавляется разметка с этим классом

    if (activeToolTip) {// если уже есть активная подсказка, то...
        activeToolTip.remove();//...удаляю ее
        activeToolTip = null;//... и присваиваю исходный статус подсказки
        return; // прекращаю выполнение функции
    }
    
    if(chooseToolTip){//если нажали подсказку       
        const textToolTip = chooseToolTip.title;//беру текст из ссылки для формирования текста в активной подсказке
        chooseToolTip.insertAdjacentHTML('afterend', addHtml(textToolTip));//добавляю HTML разметку  (из функции созданной позже)
        const newToolTip = document.querySelector(".tooltip");//нахожу эту разметку и...
        newToolTip.classList.add("tooltip_active");//...добавляю класс для активации подсказки
        
        let coords = chooseToolTip.getBoundingClientRect();//вычисляю координаты,где был клик...
        newToolTip.style.left = coords.left + "px";//...чтобы спозиционировать активную подсказку
        newToolTip.style.top = coords.bottom + "px";//...теперь она находится под ссылкой, на которую кликнули
    }
}

function addHtml(textToolTip){//разметка добавления подсказки
    return `
    <div class="tooltip">${textToolTip}</div>
    `;
}

hasToolTip.forEach((item) => {//перебираю все подсказки ...
    item.addEventListener("click", (event) => {//чтобы на на каждой был обработчик события клик
        event.preventDefault();//отмена перехода по ссылке (стандарнтного поведения)
        openToolTip(event);//вызов функции отображения подсказки при клике
        
    });

});

