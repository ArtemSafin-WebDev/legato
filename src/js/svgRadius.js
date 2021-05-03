export default function svgRadius() {
    if (!window.matchMedia("(max-width: 768px)").matches) return;

    const categoriesSvgs = Array.from(document.querySelectorAll('.fullscreen-gallery__categories-link-bg'));

    categoriesSvgs.forEach(svg => {
        const rects = Array.from(svg.querySelectorAll('rect'));

        rects.forEach(rect => {
            rect.setAttributeNS(null, "rx", "20");
        })
    })
    const surfaceSvgs = Array.from(document.querySelectorAll('.surface-types__slider-nav-link-bg'));

    surfaceSvgs.forEach(svg => {
        const rects = Array.from(svg.querySelectorAll('rect'));

        rects.forEach(rect => {
            if (window.matchMedia("(max-width: 640px)").matches) {
                rect.setAttributeNS(null, "rx", "10");
            } else {
                rect.setAttributeNS(null, "rx", "15");
            }
           
        })
    })
    const arrowSvgs = Array.from(document.querySelectorAll('.fullscreen-gallery__arrow-bg, .surface-types__slider-arrow-bg'));

    arrowSvgs.forEach(svg => {
        const rects = Array.from(svg.querySelectorAll('rect'));

        rects.forEach(rect => {
            rect.setAttributeNS(null, "rx", "12");
        })
    })
}