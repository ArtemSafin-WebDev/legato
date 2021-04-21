
import gsap from 'gsap';

export default function photoComparisonSlider() {
    
    const elements = Array.from(document.querySelectorAll('.js-photo-comparison-slider'));

    elements.forEach(element => {
        console.log('Slider element total width', element.offsetWidth);
        let dragging = false;

        element.addEventListener('pointerdown', () => {
            dragging = true;
        })

        element.addEventListener('pointermove', event => {
            if (!dragging) return;

            const rect = event.currentTarget.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;

            const width = event.currentTarget.offsetWidth;

            let progress = Math.round(offsetX / width * 100) / 100

            console.log('OffsetX', offsetX);
            console.log('Offset width', width)
            console.log('Progress', progress)

            if (progress > 1) {
                progress = 1;
            } else if (progress < 0) {
                progress = 0;
            }

            gsap.to(element, {
                duration: 0.15,
                '--percentage-shown': progress,
                overwrite: true
            });
        })

        element.addEventListener('pointerup', () => {
            dragging = false;
        })
      
        element.addEventListener('pointercancel', () => {
            dragging = false;
        })
    })
}