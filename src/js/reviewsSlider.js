import { Swiper, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export default function reviewsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-reviews-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            watchOverflow: true,
            spaceBetween: 28,
            centeredSlides: true,
            loop: true,
            loopedSlides: 4,
            pagination: {
                el: element.querySelector('.reviews__slider-pagination'),
                type: 'bullets',
                clickable: true
            }
        });
    });
}
