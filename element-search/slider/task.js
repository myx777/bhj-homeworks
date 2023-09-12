document.addEventListener('DOMContentLoaded', function () {
    // Получаем ссылки на все слайды, кнопки "Влево" и "Вправо", а также точки
    const sliderItems = document.querySelectorAll('.slider__item');
    const prevButton = document.querySelector('.slider__arrow_prev');
    const nextButton = document.querySelector('.slider__arrow_next');
    const dots = document.querySelectorAll('.slider__dot');

    // Инициализируем переменную для хранения индекса текущего слайда
    let currentSlideIndex = 0;

    // Функция для отображения конкретного слайда по его индексу
    function showSlide(index) {
        // Скрываем все слайды и точки
        sliderItems.forEach((item, i) => {
            item.classList.remove('slider__item_active');
            dots[i].classList.remove('slider__dot_active');
        });

        // Отображаем выбранный слайд и активируем соответствующую точку
        sliderItems[index].classList.add('slider__item_active');
        dots[index].classList.add('slider__dot_active');
    }

    // Обработчик клика на кнопку "Влево"
    prevButton.addEventListener('click', function () {
        // Вычисляем индекс предыдущего слайда с учетом бесконечной навигации
        currentSlideIndex = (currentSlideIndex - 1 + sliderItems.length) % sliderItems.length;
        // Отображаем слайд с новым индексом
        showSlide(currentSlideIndex);
    });

    // Обработчик клика на кнопку "Вправо"
    nextButton.addEventListener('click', function () {
        // Вычисляем индекс следующего слайда с учетом бесконечной навигации
        currentSlideIndex = (currentSlideIndex + 1) % sliderItems.length;
        // Отображаем слайд с новым индексом
        showSlide(currentSlideIndex);
    });

    // Обработчики клика на точки для навигации
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            // Устанавливаем индекс текущего слайда равным индексу точки
            currentSlideIndex = index;
            // Отображаем слайд с новым индексом
            showSlide(currentSlideIndex);
        });
    });
});
