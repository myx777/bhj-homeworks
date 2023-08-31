"use strict"
const item = document.getElementById("items");
let answerRequest;

let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.send(); // отправляем запрос
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4) {
        answerRequest = xhr.responseText;
    }
}

xhr.addEventListener('readystatechange', () => {
    const currencyValue= "руб.";

    if(xhr.readyState === xhr.DONE) {//полностью загрузился запрос       
        let answerCourse = JSON.parse(answerRequest);

        if(answerCourse.response.Valute){
           const valute = answerCourse.response.Valute;

            for(const key of Object.entries(valute)) {//в этом объекте нет итерируеммого протокола, используй Object.enteries для значений
                const valuteValue = key[1].CharCode;
                const costValue = key[1].Value;

                item.insertAdjacentHTML('afterbegin', addCourse(valuteValue, costValue, currencyValue));

                const loader = document.querySelector(".loader");
                loader.classList.remove("loader_active");
            }
        }
    }   
});

function addCourse(valuteValue, costValue, currencyValue){
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