import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function introAnimation() {

    
    const intro = document.querySelector('.intro');



    if (!intro) return;

    document.body.classList.add('intro-animation')
    const introContent = intro.querySelector('.intro__content');
    const photoComparison = document.querySelector('.photo-comparison');
    const introBlurredImage = intro.querySelector('.intro__bg-image--blurred');
    const fullscreenSlider = document.querySelector('.fullscreen-gallery');
    const fullscreenSliderContent = document.querySelector('.fullscreen-gallery__content');
    const fullscreenSliderBg = document.querySelector('.fullscreen-gallery__bg-slider')

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: intro,
            start: 'top top',
            scrub: true,
            end: '+=70%'
        }
    });

    tl.to(introContent, {
        autoAlpha: 0,
        scale: 0.85
    }).to(
        introBlurredImage,
        {
            autoAlpha: 1
        },
        0
    );

    ScrollTrigger.create({
        trigger: intro,
        start: 'top top',
        pin: true,
        pinSpacing: false,
        end: () => `+=${(photoComparison ? photoComparison.offsetHeight : 0) + (fullscreenSlider ? fullscreenSlider.offsetHeight : 0)}`
    });

    if (fullscreenSlider) {
       
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: fullscreenSlider,
                start: 'top bottom',
                end: () => `+=${fullscreenSlider.offsetHeight}`,
                scrub: true,
              
            }
        });

        tl.to(fullscreenSliderContent, {
            autoAlpha: 1,
            duration: 0.6,
            scale: 1
        })

        
    }

    // onEnter, onLeave, onEnterBack, and onLeaveBack

    if (fullscreenSliderBg) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: fullscreenSlider,
                start: () => `top top+=${document.querySelector('.page-header').offsetHeight}`,
                scrub: false,
                end: 'bottom top',
                toggleActions: 'play none none reverse',
                markers: false
            }
        });

        tl.to(fullscreenSliderBg, {
            autoAlpha: 1,
            duration: 0.3,
        })
    }
}
