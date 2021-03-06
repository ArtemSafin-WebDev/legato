import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';
import validation from './validation';
import customSelects from './customSelects';
import phoneMask from './phoneMask';
import onlyNumeric from './onlyNumeric';
import fileUpload from './fileUpload';
import fixedHeader from './fixedHeader';
import faqAccordions from './faqAccordions';
import surfaceTypesSlider from './surfaceTypesSlider';
import reviewsSlider from './reviewsSlider';
import introAnimation from './introAnimation';
import photoComparisonSlider from './photoComparisonSlider';
import fullscreenGallery from './fullscreenGallery';
import anchorLinks from './anchorLinks';
import benefits from './benefits';
import calculator from './calculator';
import svgRadius from './svgRadius';
import menu from './menu';
import specialPromoSlider from './specialPromoSlider';
import showAll from './showAll';
import modals from './modals';
import refreshOnImagesLoading from './refreshOnImagesLoading';


document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    setScrollbarWidth();

    svgRadius();
    refreshOnImagesLoading();
    validation();
    customSelects();
    phoneMask();
    onlyNumeric();
    fileUpload();
    fixedHeader();
    faqAccordions();
    surfaceTypesSlider();
    reviewsSlider();
    introAnimation();
    photoComparisonSlider();
    
    fullscreenGallery();
    anchorLinks();

    benefits();
    calculator();
    menu();
    specialPromoSlider();
    showAll();
    modals();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})
