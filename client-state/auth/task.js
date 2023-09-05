'use strict';

const signinForm = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');
let userId;

signinForm.onsubmit = async (e) => {//fetch
    e.preventDefault();

    const formData = new FormData(signinForm);

    const response = await fetch('https://students.netoservices.ru/nestjs-backend/auth', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    if (result.success) {
        document.getElementById('signin').classList.remove('signin_active');
        userId = result.user_id;
        setCookie('id', userId, { 'expires': new Date('2038-01-19T03:14:07.000Z') });
        welcome.textContent = `Добро пожаловать, пользователь #${userId}`;
        welcome.classList.add('welcome_active');
        console.log(getCookie('id'));
    } else {
        alert('Неверный логин/пароль');
    }
};

function setCookie(name, value, options = {}) {//готовая форма из книжки learninf js
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = `${name}=${value}`;

    for (let optionKey in options) {
        updatedCookie += `; ${optionKey}`;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += `=${optionValue}`;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name) {//готовая форма из книжки learninf js
    let matches = document.cookie.match(new RegExp(
        `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
