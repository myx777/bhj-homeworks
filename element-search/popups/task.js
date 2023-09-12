document.addEventListener('DOMContentLoaded', function () {
    const modalMain = document.getElementById('modal_main');
    const modalSuccess = document.getElementById('modal_success');
    const closeButtonElements = document.querySelectorAll('.modal__close');
    const showSuccessButton = document.querySelector('.show-success');

    // Показываем окно modal_main при загрузке страницы
    modalMain.classList.add('modal_active');

    // Закрытие окон по нажатию на элементы с классом modal__close
    closeButtonElements.forEach(function (closeButton) {
        closeButton.addEventListener('click', function () {
            modalMain.classList.remove('modal_active');
            modalSuccess.classList.remove('modal_active');
        });
    });

    // Показываем окно modal_success по нажатию на элемент с классом show-success
    showSuccessButton.addEventListener('click', function (event) {
        event.preventDefault();
        modalMain.classList.remove('modal_active');
        modalSuccess.classList.add('modal_active');
    });
});