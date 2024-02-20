import { div, img } from "../../libraries/html.js";
import { View } from "../../views/view.js";
import { Controller } from "../Controller.js";

export class NavbarController extends Controller {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.view = new View(parent);
        this.view.container.className = 'navbarController';
        this.createMobileMenu();
        this.button = div(this.view.container, { className: 'hamburgerMenu', onclick: this.openNavbar.bind(this) });
        this.bannerLogo = img(this.view.container, { className: 'bannerLogo' });
        this.bannerLogo.src = '../assets/images/brand.png';
    }

    createMobileMenu() {
        this.mobileMenu = this.createNav('nav', this.view.container, 'nav');
        this.menuList = this.createNav('ul', this.mobileMenu, 'navList');
        this.options = ['Inicio', 'Verduras', 'Frutas', 'Entregas'];
        this.icons = [
            '../assets/icons/home.png',
            '../assets/icons/verdura.png',
            '../assets/icons/fruta.png',
            '../assets/icons/entregas.png'
        ];

        this.options.forEach((option, index) => {
            const li = this.createMenuItem('li', this.menuList);
            const img = this.createImage(this.icons[index], 'Icono');
            const link = this.createLink(`#${option}`, option);

            li.appendChild(img);
            li.appendChild(link);
        });
    }

    createNav(tagName, parent, className) {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        parent.appendChild(element);
        return element;
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


    openNavbar() {
        console.log('hola');
    }
}