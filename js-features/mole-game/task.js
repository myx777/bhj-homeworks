"use strict"

const dead = document.getElementById('dead'); // Получение из HTML попадание по кроту
const lost = document.getElementById('lost'); // Получение из HTML промахивание по кроту

let counterDead = 0; // Счетчик попаданий по кроту
let counterLost = 0; //Счетчик промахов по кроту

// принимает индекс и возвращает элемент DOM с соответствующим идентификатором "hole" + индекс
let getHole = index => document.getElementById(`hole${index}`); 

//перебираю с 1 до 9 (включительно), так как "hole1"..."hole9",  создаю обработчиков событий для каждого отверстий в игре
//каждое отверстие сохраняю в holeб чтобы потом на каждом вызывать onclick
for(let holeIndex = 1; holeIndex < 10; holeIndex +=1) {
    let hole = getHole(holeIndex); 
    
    hole.onclick = () => {
        if(hole.classList.contains("hole_has-mole")) { //проверяю, попал ли по кроту
            counterDead += 1; 
            dead.textContent = counterDead;
        } else {
            counterLost += 1;
            lost.textContent = counterLost;
        }

        if(counterDead === 10) { // 10 попаданий по кротам - выигрыш
            alert( "Вы победили!" );
            // обнуляем счетчики
            counterDead = 0; 
            counterLost = 0;
            dead.textContent = counterDead;
            lost.textContent = counterLost;
        }
        if(counterLost === 5) { // 5 промахов - проигрыш
            alert( "Вы проиграли! Кроты спасены!" );
            counterDead = 0; 
            counterLost = 0;
            dead.textContent = counterDead;
            lost.textContent = counterLost;
        }
    }
}