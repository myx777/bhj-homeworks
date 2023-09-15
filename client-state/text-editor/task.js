'use strict'

const editor = document.getElementById('editor');
const clearButton = document.getElementById('clearButton');

// При загрузке страницы пытаемся восстановить значение текстового редактора из локального хранилища
const savedText = localStorage.getItem('editorText');
if (savedText) {
    editor.value = savedText;
}

// Обработчик события изменения текста в редакторе
editor.addEventListener('input', function() {
    // Сохраняем значение текстового редактора в локальное хранилище
    localStorage.setItem('editorText', editor.value);
});

// Обработчик события нажатия на кнопку "Очистить содержимое"
clearButton.addEventListener('click', function() {
    // Очищаем значение текстового редактора и локальное хранилище
    editor.value = '';
    localStorage.removeItem('editorText');
});