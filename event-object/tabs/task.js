"use strict";

const tab = document.querySelectorAll(".tab"); // выбираем элементы (вкладки) из DOM
const tabsContainer = document.querySelector(".tab__navigation"); // контейнер вкладок
const tabContent = document.querySelectorAll(".tab__content"); // получаем контент вкладок из DOM

// Функция, которая выполнится по клику на вкладку
function tabClick(event) {
  const clickedTab = event.target.closest(".tab"); // Находим ближайший родительский элемент с классом "tab"

  // Проверяем, если нет элемента с классом "tab" в родительских элементах, то выходим из функции
  if (!clickedTab) {
    return;
  }

  // Проверяем, если текущая вкладка уже активна, то не делаем ничего
  if (clickedTab.classList.contains("tab_active")) {
    return;
  }

  // Удаляем класс "tab_active" у всех вкладок
  tab.forEach((tabItem) => {
    tabItem.classList.remove("tab_active");
  });

  // Добавляем класс "tab_active" только на текущую вкладку
  clickedTab.classList.add("tab_active");

  // Находим индекс текущей вкладки среди всех вкладок
  const index = Array.from(tab).indexOf(clickedTab);

  // Отображаем контент соответствующей вкладки
  tabContent.forEach((contentItem) => {
    contentItem.classList.remove("tab__content_active");
  });

  tabContent[index].classList.add("tab__content_active");
}

// Добавляем обработчик события "click" на контейнер вкладок
tabsContainer.addEventListener("click", tabClick);
