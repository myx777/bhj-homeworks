"use strict"

// Создаю функцию, которая вызвывается с инетервалом 1 сек и перезаписывает в таймере время (обратный отсчет)
const timerId = setInterval(function countDownTimer() {
    // Инициализация переменной из HTML
    const timerStatus = document.getElementById("timer_seconds");
    let seconds = +timerStatus.textContent; 
    seconds -= 1;
    timerStatus.textContent = (seconds < 10) ? "0" + seconds : seconds; // Добаляю 0 справа, когда таймер менее 10 сек
    // Когда таймер достигает 0:
    if (seconds < 0) {
        alert("Вы победили в конкурсе"); 
        clearInterval(timerId); //Останавливаю дальнейший повторный вызов функции
        // Перенаправляю пользователя на другой адрес
        const url = document.createElement('a'); // Генерирую тег <a>
        url.href = 'https://winrar-full.com/go/?https://www.rarlab.com/rar/rarmacos-x64-622.tar.gz'; // Добавляю в тег <a> ссылку       
        url.download = "winrar.gz"; // Добавляю команду скачать с описанием
        url.textContent = 'Скачать файл'
        //Добавляю команду, чтобы скачивание началось автоматически с открытием новой 
        // чистой страницы с адресом который задал выше
        url.target="_blank";
        url.click();
    }
}, 1000);
