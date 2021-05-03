import {clearAllBodyScrollLocks as unlockScroll, disableBodyScroll as lockScroll} from 'body-scroll-lock';

export default function menu() {
    const menu = document.querySelector('.page-header__menu');
    const menuOpenBtn = document.querySelector('.page-header__menu-open-btn');
    const menuCloseBtn = document.querySelector('.page-header__menu-close')
    window.menuOpen = false;

    const openMenu = () => {
        if (window.menuOpen) return;

        document.body.classList.add('mobile-menu-open');
        window.menuOpen = true;
        lockScroll(menu);
    }


    const closeMenu = () => {
        if (!window.menuOpen) return;

        document.body.classList.remove('mobile-menu-open');
        window.menuOpen = false;
        unlockScroll();
    }

    window.openMenu = openMenu;
    window.closeMenu = closeMenu;

    menuOpenBtn.addEventListener('click', event => {
        event.preventDefault();
        openMenu();
    });

    menuCloseBtn.addEventListener('click', event => {
        event.preventDefault();
        closeMenu();
    })

    menu.addEventListener('click', event => {
        if (event.target === menu) {
            closeMenu();
        }
    })
}