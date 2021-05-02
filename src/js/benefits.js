export default function benefits() {
    const elements = Array.from(document.querySelectorAll('.js-benefits'));

    elements.forEach(element => {
        const cards = Array.from(element.querySelectorAll('.benefits__card'));
        const setActiveCard = index => {
            const currentCardActive = cards[index].classList.contains('active');
            cards.forEach(card => card.classList.remove('active'));

            if (!currentCardActive) {
                cards[index].classList.add('active');
            }
        };

        cards.forEach((card, cardIndex) => {
            const cardBtn = card.querySelector('.benefits__card-btn');
            cardBtn.addEventListener('click', event => {
                event.preventDefault();

                setActiveCard(cardIndex);
            });
        });
    });
}
