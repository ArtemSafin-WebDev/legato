export default function showAll() {
    const elements = Array.from(document.querySelectorAll('.js-show-all'));
    elements.forEach(btn => {
        let open = false;
        btn.addEventListener('click', event => {
            event.preventDefault();
            if (!open) {
                btn.textContent = 'Скрыть';
                btn.closest('.js-show-all-container').classList.add('show-all')
                open = true;
            } else {
                btn.textContent = 'Показать';
                btn.closest('.js-show-all-container').classList.remove('show-all')
                open = false;
            }
        })
    })
}