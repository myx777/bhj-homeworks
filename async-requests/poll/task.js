"use strict"

const title = document.querySelector(".poll__title");
const answer = document.querySelector(".poll__answers");

let titleValue;
let answerValue;
let answerRequest;

let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send(); // отправляем запрос
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4) {
        answerRequest = xhr.responseText;
    }
}

xhr.addEventListener('readystatechange', () => {
    if(xhr.readyState === xhr.DONE) {//полностью загрузился запрос       
        let response = JSON.parse(answerRequest);

        if (response.data.title) {
            title.textContent = response.data.title;
        }
        if (response.data.answers && Array.isArray(response.data.answers)) {//удостверяюсь, что парсится массив из json
            const answers = response.data.answers;

            for (let element of answers){
                const button = document.createElement("button");
                button.textContent = element;
                answer.appendChild(button);

                button.addEventListener("click", () => {//помещаю обработчик на кнпоки, чтобы обработчик срабатывал после того, как все будет загружено
                alert("Спасибо, ваш голос засчитан!");
                });
            }
        }
    }
    
});