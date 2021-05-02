import { Swiper, Navigation, Controller, EffectFade } from 'swiper';

import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

Swiper.use([Navigation, Controller, EffectFade]);

export default function fullscreenGallery() {
    const elements = Array.from(document.querySelectorAll('.js-fullscreen-gallery'));
    elements.forEach(element => {
        const bgSliderContainer = element.querySelector('.fullscreen-gallery__bg-slider .swiper-container');
        const links = Array.from(element.querySelectorAll('.fullscreen-gallery__categories-link'));
        const innerSliderContainer = element.querySelector('.fullscreen-gallery__inner-slider .swiper-container');
        const prevEl = element.querySelector('.fullscreen-gallery__arrow--prev');
        const nextEl = element.querySelector('.fullscreen-gallery__arrow--next');
        const AUTOPLAY_DURATION = 10;
        const setActiveLink = index => {
            links.forEach(link => link.classList.remove('active'));
            links[index].classList.add('active');
        };

        let activeIndex = 0;

        const mainSlider = new Swiper(bgSliderContainer, {
            slidesPerView: 1,
            watchOverflow: true,
            init: false,
            speed: 700,
            loop: true,
            allowTouchMove: true,
            navigation: {
                nextEl,
                prevEl
            },
            on: {
                init: swiper => {
                    setActiveLink(swiper.realIndex);
                    autoplay(swiper.realIndex);

                    activeIndex = swiper.realIndex;
                },
                slideChange: swiper => {
                    if (activeIndex === swiper.realIndex) return;
                    setActiveLink(swiper.realIndex);
                    autoplay(swiper.realIndex);

                    activeIndex = swiper.realIndex;
                }
            }
        });

        mainSlider.init();

        

        function autoplay(startIndex) {
            links.forEach(link => {
                const linkProgress = link.querySelector('.fullscreen-gallery__categories-link-progress');
                gsap.set(linkProgress, {
                    drawSVG: '0% 0%'
                });
                gsap.killTweensOf(linkProgress);
            });

            const nextElProgress = nextEl.querySelector('.fullscreen-gallery__arrow-progress');

            gsap.set(nextElProgress, {
                drawSVG: '0% 0%'
            });

            gsap.killTweensOf(nextElProgress);

            nextEl.classList.add('autoplaying');

            const currentLink = links[startIndex];
            const currentLinkProgress = currentLink.querySelector('.fullscreen-gallery__categories-link-progress');

           

            const tl = gsap.timeline({
                onComplete: () => {
                    mainSlider.slideNext();
                }
            });
            tl.fromTo(
                currentLinkProgress,
                { drawSVG: '0% 0%' },
                {
                    duration: AUTOPLAY_DURATION,
                    drawSVG: '0% 100%',
                    ease: 'none'
                }
            );

            tl.fromTo(
                nextElProgress,
                { drawSVG: '0% 0%' },
                {
                    duration: AUTOPLAY_DURATION,
                    drawSVG: '0% 100%',
                    ease: 'none'
                }, 0
            );
        }

        const innerSlider = new Swiper(innerSliderContainer, {
            slidesPerView: 1,
            watchOverflow: true,
            autoHeight: true,
            effect: 'fade',
            speed: 700,
            loop: true,
            allowTouchMove: true,
            fadeEffect: {
                crossFade: true
            }
        });

        innerSlider.controller.control = mainSlider;
        mainSlider.controller.control = innerSlider;

        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();

                mainSlider.slideToLoop(linkIndex);
            });
        });
    });
}
