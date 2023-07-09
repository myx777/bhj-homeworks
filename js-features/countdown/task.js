"use strict"

const timerId = setInterval(function countDownTimer() {
    const timerStatus = document.getElementById("timer_seconds");
    let seconds = +timerStatus.textContent;
    seconds -= 1;
    timerStatus.textContent = (seconds < 10) ? "0" + seconds : seconds;
    
    if (seconds < 0) {
        alert("Вы победили в конкурсе");
        clearInterval(timerId);
        const url = document.createElement('a');
        url.href = 'https://winrar-full.com/go/?https://www.rarlab.com/rar/rarmacos-x64-622.tar.gz';
        url.download = "winrar.gz";
        url.textContent = 'Скачать файл'
        url.target="_blank";
        url.click()
    }
}, 1000);
