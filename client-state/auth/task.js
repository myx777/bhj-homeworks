'use strict';

const signinForm = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');

async function authorizeUser(formData) {// Функция для выполнения авторизации
    try {
        const response = await fetch('https://students.netoservices.ru/nestjs-backend/auth', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            // Сохраняем id пользователя в локальное хранилище
            localStorage.setItem('id', result.user_id);
            // Отображаем id пользователя в блоке welcome
            welcome.textContent = `Добро пожаловать, ${result.user_id}!`;
            welcome.classList.add('welcome_active');

            document.getElementById('signin').classList.remove('signin_active');
        } else {
            // Выводим сообщение об ошибке
            alert('Неверный логин/пароль');
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
}

// Проверяем наличие id пользователя в локальном хранилище при загрузке страницы
window.addEventListener('load', () => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
        // Отображаем блок welcome с сохраненным id пользователя
        welcome.textContent = `Добро пожаловать, #${storedUserId}!`;
        welcome.classList.add('welcome_active');
        document.getElementById('signin').classList.remove('signin_active');
    }
});

// Обработчик события отправки формы
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(signinForm);
    await authorizeUser(formData); // Вызываем функцию для авторизации
});