"use strict"
const rotatorCase = document.querySelectorAll(".rotator__case"); // псевдомассив из всех ротаторов с классом rotator__case из DOM

let interval = 1;

function toggleRotator() {
  rotatorCase.forEach((item, index) => {
    if (index === interval) {
      item.classList.add("rotator__case_active");
      item.style.color = item.dataset.color;// Меняем цвет текста
      const speed = +item.dataset.speed;// Добавляю значение скорости с явным преобразованием в число
      clearInterval(intervalId); // Очищаем предыдущий интервал
      intervalId = setInterval(toggleRotator, speed); // Создаем новый интервал с обновленным speed
    } else {
      item.classList.remove("rotator__case_active");
    }
  });

  interval++;

  if (interval === rotatorCase.length) {
    interval = 0;
  }
}

let intervalId = setInterval(toggleRotator, 1000); // Запускаем первый интервал с базовым speed в 1000 мс (1 секунда)
