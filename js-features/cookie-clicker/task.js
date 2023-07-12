"use strict";

const cookie = document.getElementById("cookie");
const clickerCounter = document.getElementById("clicker__counter");
const clickerSpeed = document.getElementById("clicker__speed");

let clickCount = 0; // Счетчик кликов
let startTime = Date.now(); // Время начала
let endTime = Date.now(); // Время окончания
let clickSpeed = 0; // Скорость клика

// Функция, вызываемая при клике на печеньку
function cookieCounter() {
  clickCount++; 
  clickerCounter.textContent = clickCount; // Обновление значения счетчика кликов

  // Изменение размера печеньки
  if (cookie.width === 200) {
    cookie.style.width = "250px";
    cookie.style.height = "250px";
  } else {
    cookie.style.width = "200px";
    cookie.style.height = "200px";
  }

  endTime = Date.now(); // Обновление времени окончания
  const timeInSeconds = (endTime - startTime) / 1000; // Вычисление времени в секундах
  clickSpeed = 1 / timeInSeconds; // Вычисление скорости клика
  startTime = endTime; // Обновление времени начала
  clickerSpeed.textContent = clickSpeed.toFixed(2); // Обновление значения скорости клика

}

// Назначение обработчика события клика на печеньку
cookie.onclick = cookieCounter;

