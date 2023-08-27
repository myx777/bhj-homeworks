"use strict";

const tasksList = document.getElementById("tasks__list");//контейнер по id в котором будут задачи
const form = document.querySelector("form");//форма из DOM

function addCheckList(textValue) {//функция добавления html разметки задачи
    return `
            <div class="task">
                <div class="task__title">
                   ${textValue}
                </div>
                 <a href="#" class="task__remove">&times;</a>
            </div> 
    `;
}

function createTask() {//функция добавления задачи
    const textInput = form.task__input;//input из поля ввода
    const textValue = textInput.value;//строка (то, что ввел пользователь) из формы ввода
    if(textValue.trim() === '') {//проверка на пустые строчки
        return;
    };
    const htmlValue = addCheckList(textValue);//добавляю в перменную функцию добавления разметки
    tasksList.insertAdjacentHTML('beforeend', htmlValue);//то добавляю карточку
    form.reset();//очищаю поле ввода формы после добавления задачи
}

function reduceTask(event) {//функция удаления задачи
    const taskRemove = event.target.closest(".task__remove");//ищу тот крестик, на который кликнули
    if(taskRemove) {//если кликнули на крестик, то
        const valueTaskRemove = taskRemove.closest(".task");//ищем близжайшего родственника (в данном случае родителя)
        valueTaskRemove.remove();//и удаляем всю html разметку с задачей
    }
}

form.addEventListener("submit", (event) => {//обработчик на добавление задачи
    event.preventDefault(); // Отменяем стандартное поведение формы
    createTask();//запускаю функцию добавления задачи
    
});

tasksList.addEventListener("click", reduceTask);//обработчик на удаление задачи
