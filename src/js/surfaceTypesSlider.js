import { Swiper, Navigation } from 'swiper';

import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(DrawSVGPlugin, ScrollToPlugin);

Swiper.use([Navigation]);

export default function surfaceTypesSlider() {
    const elements = Array.from(document.querySelectorAll('.js-surface-types-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const links = Array.from(element.querySelectorAll('.surface-types__slider-nav-link'));
        const linksContainer = element.querySelector('.surface-types__slider-nav');
        const prevEl = element.querySelector('.surface-types__slider-arrow--prev');
        const nextEl = element.querySelector('.surface-types__slider-arrow--next');
        const AUTOPLAY_DURATION = 10;
        const setActiveLink = index => {
            links.forEach(link => link.classList.remove('active'));
            links[index].classList.add('active');
        };

        let activeIndex = 0;
        const instance = new Swiper(container, {
            watchOverflow: true,
            speed: 500,
            slidesPerView: 1,
            spaceBetween: 0,
            init: false,
            loop: true,
            navigation: {
                nextEl: window.matchMedia('(max-width: 640px)').matches ? element.querySelector('.surface-types__slider-mobile-arrow--next') : nextEl,
                prevEl: window.matchMedia('(max-width: 640px)').matches ? element.querySelector('.surface-types__slider-mobile-arrow--prev') : prevEl
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

        instance.init();

        function autoplay(startIndex) {
            links.forEach(link => {
                const linkProgress = link.querySelector('.surface-types__slider-nav-link-progress');
                gsap.set(linkProgress, {
                    drawSVG: '0% 0%'
                });
                gsap.killTweensOf(linkProgress);
            });

            const nextElProgress = nextEl.querySelector('.surface-types__slider-arrow-progress');

            gsap.set(nextElProgress, {
                drawSVG: '0% 0%'
            });

            gsap.killTweensOf(nextElProgress);

            nextEl.classList.add('autoplaying');

            const currentLink = links[startIndex];
            const currentLinkProgress = currentLink.querySelector('.surface-types__slider-nav-link-progress');

            if (window.matchMedia('(max-width: 640px)').matches) {
                gsap.to(linksContainer, {
                    duration: 2,
                    ease: 'power2.out',
                    scrollTo: {
                        x: currentLink.offsetLeft,
                        offsetX: parseFloat(window.getComputedStyle(document.querySelector('.container'), null).getPropertyValue('padding-left'))
                    }
                });
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    instance.slideNext();
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
                },
                0
            );
        }

        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();

                instance.slideToLoop(linkIndex);
            });
        });
    });
}
