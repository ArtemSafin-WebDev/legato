import imagesLoaded from 'imagesloaded';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function refreshOnImagesLoading() {
    const imgLoaded = imagesLoaded(document.querySelector('.page-content'));

    imgLoaded.on('always', () => {
        ScrollTrigger.refresh();

        console.log('Images has been loaded');
    });

    document.addEventListener('lazyloaded', function() {
        ScrollTrigger.refresh();

       
    });
}
