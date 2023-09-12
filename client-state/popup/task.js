document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('subscribe-modal');
    const closeButton = modal.querySelector('.modal__close');

    // Проверяем, есть ли в cookie информация о закрытии окна
    const isModalClosed = getCookie('modal_closed');

    // Если в cookie нет информации о закрытии, показываем окно
    if (!isModalClosed) {
        modal.classList.add('modal_active');
    }

    // Закрытие окна при клике на крестик
    closeButton.addEventListener('click', function () {
        modal.classList.remove('modal_active');
        // Устанавливаем cookie с информацией о закрытии окна и атрибутом SameSite=None ибо firefox требуетadd
        setCookie('modal_closed', 'true', { expires: 365, sameSite: 'None', secure: true });
    });

    // Функция для установки cookie
    function setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += '; ' + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += '=' + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    // Функция для получения cookie
    function getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
});