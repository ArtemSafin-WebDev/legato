import { Swiper, Navigation, Controller, EffectFade } from 'swiper';

Swiper.use([Navigation, Controller, EffectFade]);

export default function fullscreenGallery() {
    const elements = Array.from(document.querySelectorAll('.js-fullscreen-gallery'));
    elements.forEach(element => {
        const bgSliderContainer = element.querySelector('.fullscreen-gallery__bg-slider .swiper-container');
        const links = Array.from(element.querySelectorAll('.fullscreen-gallery__categories-link'));
        const innerSliderContainer = element.querySelector('.fullscreen-gallery__inner-slider .swiper-container');

        const setActiveLink = index => {
            links.forEach(link => link.classList.remove('active'));
            links[index].classList.add('active');
        };

        const mainSlider = new Swiper(bgSliderContainer, {
            slidesPerView: 1,
            watchOverflow: true,
            init: false,
            speed: 700,
            navigation: {
                nextEl: element.querySelector('.fullscreen-gallery__arrow--next'),
                prevEl: element.querySelector('.fullscreen-gallery__arrow--prev')
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

        mainSlider.init();

        const innerSlider = new Swiper(innerSliderContainer, {
            slidesPerView: 1,
            watchOverflow: true,
            autoHeight: true,
            effect: 'fade',
            speed: 700,
            fadeEffect: {
                crossFade: true
            }
        });

        innerSlider.controller.control = mainSlider;
        mainSlider.controller.control = innerSlider;

        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();

                setActiveLink(linkIndex);
                mainSlider.slideTo(linkIndex);
            });
        });
    });
}
