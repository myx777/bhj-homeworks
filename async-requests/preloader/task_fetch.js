"use strict";

const item = document.getElementById("items");

function fetchCourses() {
  const currencyValue = "руб.";

  fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then((response) => response.json())
    .then((answerCourse) => {
      if (answerCourse.response.Valute) {
        const valute = answerCourse.response.Valute;

        for (const [key, value] of Object.entries(valute)) {
          const valuteValue = value.CharCode;
          const costValue = value.Value;

          item.insertAdjacentHTML('afterbegin', addCourse(valuteValue, costValue, currencyValue));

          const loader = document.querySelector(".loader");
          loader.classList.remove("loader_active");
        }
      }
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
}

function addCourse(valuteValue, costValue, currencyValue) {
  return `
    <div class="item">
      <div class="item__code">
        ${valuteValue}
      </div>
      <div class="item__value">
        ${costValue}
      </div>
      <div class="item__currency">
        ${currencyValue}
      </div>
    </div>
  `;
}

fetchCourses();
