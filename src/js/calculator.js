import { Swiper, EffectFade } from 'swiper';

Swiper.use([EffectFade]);

export default function calculator() {
    const elements = Array.from(document.querySelectorAll('.js-calculator'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        const slider = new Swiper(container, {
            allowTouchMove: false,

            effect: 'fade',
            autoHeight: false,
            watchOverflow: true,
            fadeEffect: {
                crossFade: true
            }
        });

        let activeMode = 1;

        const formSelect = element.querySelector('#form-select');
        const lengthInput = element.querySelector('#length');
        const widthInput = element.querySelector('#width');
        const diameterInput = element.querySelector('#diameter');
        const thicknessSelect = element.querySelector('#thickness-select');
        const totalElement = element.querySelector('.calculator__form-price');

        const recalculationInputs = [widthInput, lengthInput, diameterInput, thicknessSelect, formSelect];

        const calculate = () => {
            const length = parseFloat(lengthInput.value);
            const width = parseFloat(widthInput.value);
            const diameter = parseFloat(diameterInput.value);
            const thickness = parseFloat(thicknessSelect.value);

            const lengthOutputs = Array.from(element.querySelectorAll('.js-calculator-length-output'));
            const widthOutputs = Array.from(element.querySelectorAll('.js-calculator-width-output'));
            const diameterOutputs = Array.from(element.querySelectorAll('.js-diameter-output'));

            totalElement.style.display = 'none';

            console.log({
                length,
                width,
                diameter,
                thickness
            });

            lengthOutputs.forEach(output => {
                output.innerHTML = isNaN(length) ? '&nbsp;' : `${length} см`;
            });
            widthOutputs.forEach(output => {
                output.innerHTML = isNaN(width) ? '&nbsp;' : `${width} см`;
            });
            diameterOutputs.forEach(output => {
                output.innerHTML = isNaN(diameter) ? '&nbsp;' : `${diameter} см`;
            });

            let total = 0;

            if (activeMode === 1 || activeMode === 2) {
                if (isNaN(length) || isNaN(width) || isNaN(thickness)) return;

                total = 800 + ((length * width) / 100) * thickness;
            } else if (activeMode === 3) {
                if (isNaN(diameter) || isNaN(thickness)) return;

                total = 800 + (diameter / 100 * thickness);
            }

            if (!isNaN(total) && total !== 0) {
                totalElement.innerHTML = `
                <div class="calculator__form-price-new">
                ${Math.ceil(total)} ₽
                
                </div>
                <div class="calculator__form-price-old">
                    ${Math.ceil(total * 1.1)} ₽
                </div>
                    `;
                document.getElementById('calc_price').value = Math.ceil(total);
                totalElement.style.display = '';
            } else {
                console.error('Total is NaN or zero');

                return;
            }
        };

        const handleTableForm = () => {
            slider.slideTo(activeMode - 1);

            if (activeMode === 3) {
                diameterInput.closest('.calculator__form-field').style.display = '';
                lengthInput.closest('.calculator__form-field').style.display = 'none';
                widthInput.closest('.calculator__form-field').style.display = 'none';


                diameterInput.disabled = false;
                lengthInput.disabled = true;
                widthInput.disabled = true;
            } else {
                diameterInput.closest('.calculator__form-field').style.display = 'none';
                lengthInput.closest('.calculator__form-field').style.display = '';
                widthInput.closest('.calculator__form-field').style.display = '';

                diameterInput.disabled = true;
                lengthInput.disabled = false;
                widthInput.disabled = false;
            }
        };

        handleTableForm();

        calculate();

        formSelect.addEventListener('change', event => {
            activeMode = Number(event.target.value);
            handleTableForm();
            console.log('table form', activeMode);
        });

        recalculationInputs.forEach(input => {
            if (input.matches('input')) {
                input.addEventListener('input', () => {
                    calculate();
                });
            } else if (input.matches('select')) {
                input.addEventListener('change', () => {
                    calculate();
                });
            }
        });
    });
}
