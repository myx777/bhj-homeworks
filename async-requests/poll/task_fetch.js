//испльзую fetch

"use strict";

const title = document.querySelector(".poll__title");
const answer = document.querySelector(".poll__answers");

fetch('https://students.netoservices.ru/nestjs-backend/poll')
  .then((response) => response.json())
  .then((data) => {
    if (data.title) {
      title.textContent = data.title;
    }

    if (data.answers && Array.isArray(data.answers)) {
      data.answers.forEach((element) => {
        const button = document.createElement("button");
        button.textContent = element;
        answer.appendChild(button);

        button.addEventListener("click", () => {
          alert("Спасибо, ваш голос засчитан!");
        });
      });
    }
  })
  .catch((error) => {
    console.error("Ошибка при получении данных:", error);
  });
