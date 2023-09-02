"use strict";

const progress = document.getElementById('progress');
const form = document.getElementById('form');

function upload(file) {
    const xhr = new XMLHttpRequest();

    // обработчик для отправки
    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            progress.value = (event.loaded / event.total) * 100;
        }
    }

    // обработчики успеха и ошибки
    xhr.onload = xhr.onerror = function() {
        if (this.status === 200) {
            console.log("success");
        } else {
            console.log("error " + this.status);
        }
    };

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload", true);
    xhr.send(file);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fileInput = form.elements.file;
    const file = fileInput.files[0];
    if (file) {
        upload(file);
    }
    return false;
});