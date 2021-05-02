export default function fixedHeader() {
    const pageHeader = document.querySelector('.page-header');
    if (!pageHeader) return;
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            pageHeader.classList.add('fixed');
        } else {
            pageHeader.classList.remove('fixed');
        }
    });
}
