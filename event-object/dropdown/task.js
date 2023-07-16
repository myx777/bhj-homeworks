"use strict"

const dropDownValue = document.querySelector(".dropdown__value");//содержит выбранное значение
const dropDownItem = document.querySelectorAll(".dropdown__item");//разделы кнопок, псевдомассив
const dropDownUpList = document.querySelector(".dropdown__list");//разделы списка
const dropDownLink = document.querySelectorAll(".dropdown__link");//ссылки на элементы выбора

function clickDropDownUpList() {
    if(dropDownUpList.classList.contains("dropdown__list_active")) {//проверяем, если список развернут
        dropDownUpList.classList.remove("dropdown__list_active");//то сворачиваем список
    } else {
        dropDownUpList.classList.add("dropdown__list_active");//разворачиваю список
    }
}

function choiceItem(event) {
    let target = event.target;//присваем переменной цель события(выбранное значение)
    if(!target.classList.contains("dropdown__link")) return; //проверяю есть ли у данной цели события(значения) класс дропдаун линк
    dropDownValue.textContent = target.textContent;//записываю текст цели в элемент содержащий выбранную цель(значение)
    event.preventDefault();//запрещаем переход по ссылке
    dropDownUpList.classList.remove("dropdown__list_active");//закрывыаем список

    /*    
    //находим ближайший родительский элемент с классом дропдаун линк относительно цели события event.target(выбранного значения)
    //определения, является ли элемент, на который был клик, элементом с классом "dropdown__link"   
    const clickedLink = event.target.closest(".dropdown__link");
    
    //Это условие проверяет, если clickedLink содержит ссылку на элемент с классом "dropdown__link". 
    //Если условие истинно, значит, был выполнен клик на элементе, который является ссылкой внутри выпадающего списка.
    if (clickedLink) {
      dropdownValue.textContent = clickedLink.textContent;
    }
    */
}

dropDownValue.addEventListener("click", clickDropDownUpList);
dropDownUpList.addEventListener("click", choiceItem);
