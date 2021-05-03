import { Swiper } from 'swiper';

export default function specialPromoSlider() {
    if (!window.matchMedia("(max-width: 640px)").matches) return;
    const elements = Array.from(document.querySelectorAll('.js-special-promo-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            watchOverflow: true,
            spaceBetween: 20,
            slidesPerView: 'auto'
        })
    })
}