import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function surfaceTypesSlider() {
    const elements = Array.from(document.querySelectorAll('.js-surface-types-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const links = Array.from(element.querySelectorAll('.surface-types__slider-nav-link'));
        const setActiveLink = index => {
            links.forEach(link => link.classList.remove('active'));
            links[index].classList.add('active');
        };
        const instance = new Swiper(container, {
            watchOverflow: true,
            speed: 500,
            slidesPerView: 1,
            spaceBetween: 0,
            init: false,
            navigation: {
                nextEl: element.querySelector('.surface-types__slider-arrow--next'),
                prevEl: element.querySelector('.surface-types__slider-arrow--prev')
            },
            on: {
                init: swiper => {
                    setActiveLink(swiper.realIndex);
                },
                slideChange: swiper => {
                    setActiveLink(swiper.realIndex);
                }
            }
        });

        instance.init();

        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();

                setActiveLink(linkIndex);
                instance.slideTo(linkIndex);
            });
        });
    });
}
