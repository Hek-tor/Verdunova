import { div, img, p, ul } from "../../libraries/html.js";
import { View } from "../../views/view.js";
import { Controller } from "../Controller.js";

export class NavbarController extends Controller {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.view = new View(parent);
        this.view.container.className = 'navbarController';
        this.openButton = div(this.view.container, { className: 'hamburgerMenu', onclick: this.openNavbar.bind(this) });
        this.bannerLogo = img(this.view.container, { className: 'bannerLogo' });
        this.bannerLogo.src = '../assets/images/brand.webp';
        this.bannerLogo.setAttribute('alt', 'Marca registrada Verdunova');
    }

    openNavbar() {
        this.createMobileMenu();
        this.moveFrom();
    }

    closeNavbar() {
        if (this.mobileMenu && this.mobileMenu.parentNode) {
            this.mobileMenu.parentNode.removeChild(this.mobileMenu);
            this.mobileMenu.classList.remove('nav');
            document.body.style.overflowY = "scroll";
        }
    }

    createMobileMenu() {
        document.body.style.overflowY = "hidden";
        this.mobileMenu = div(this.view.container, { className: 'nav' });
        this.menuList = ul(this.mobileMenu, { className: 'navList' });
        this.closeButton = div(this.menuList, { className: 'closeMenu', onclick: this.closeNavbar.bind(this) });
        this.copyright = div(this.mobileMenu, { className: 'copyright' });
        this.brand = img(this.copyright, { className: 'brand' });
        this.copyText = p(this.copyright, { className: 'copyText' });
        this.brand.src = '../assets/images/Verdunova.webp';
        this.brand.setAttribute('alt', 'Marca registrada Verdunova');
        this.copyText.textContent = 'Copyright 2024. All rights reserved';

        this.options = ['Inicio', 'Verduras', 'Frutas', 'Entregas'];
        this.icons = [
            '../assets/icons/home.webp',
            '../assets/icons/verdura.webp',
            '../assets/icons/fruta.webp',
            '../assets/icons/entregas.webp'
        ];
        this.options.forEach((option, index) => {
            const li = this.createMenuItem('li', this.menuList);
            const img = this.createImage(this.icons[index], 'Icono');
            const link = this.createLink(`#${option}`, option);

            li.appendChild(img);
            li.appendChild(link);
        })

        document.addEventListener('click', function (event) {
            const nav = document.querySelector('.nav');
            const openBtn = document.querySelector('.hamburgerMenu');
            const closeBtn = document.querySelector('.closeMenu');
            if (nav && !nav.contains(event.target) && event.target !== openBtn && event.target !== closeBtn) {
                this.closeNavbar();
            }
        }.bind(this));
    }

    createMenuItem(tagName, parent) {
        const li = document.createElement(tagName);
        li.className = 'item';
        parent.appendChild(li);
        return li;
    }

    createImage(src, alt) {
        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.setAttribute('alt', alt);
        img.className = 'icon';
        return img;
    }

    createLink(href, text) {
        const link = document.createElement('a');
        link.setAttribute('href', href);
        link.textContent = text;
        return link;
    }

    moveFrom() {
        gsap.from(this.mobileMenu, { x: -70, duration: 0.5 });
    }
}