"use strict";

const progress = document.getElementById('progress');
const sendBottom = document.getElementById('send');
п
function upload(file) {
    const xhr = new XMLHttpRequest();
  
    // обработчик для отправки
    xhr.onprogress = function(event) {//событие onprogress
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            progress.value = percentComplete;
        }
    }
  
    // обработчики успеха и ошибки
    // если status == 200, то это успех, иначе ошибка
    xhr.onload = xhr.onerror = function() {
      if (this.status == 200) {
        console.log("success");
      } else {
        console.log("error " + this.status);
      }
    };
  
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload", true);
    xhr.send(file);
  
}

sendBottom.addEventListener('click', (event) => {
    event.preventDefault();
    const input = form.elements.file;
    const file = input.files[0];
    if (file) {
      upload(file);
    }
    return false;
})