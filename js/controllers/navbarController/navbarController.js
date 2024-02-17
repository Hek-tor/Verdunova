import { div, img } from "../../libraries/html.js";
import { View } from "../../views/view.js";
import { Controller } from "../Controller.js";

export class NavbarController extends Controller {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.view = new View(parent);
        this.view.container.className = 'navbarController';

        this.button = div(this.view.container, { className: 'hamburgerMenu', onclick: this.openNavbar.bind(this) });
        this.bannerLogo = img(this.view.container, { className: 'bannerLogo' });
        this.bannerLogo.src = '../assets/images/brand.png';
    }

    openNavbar() {
        console.log('hola');
    }
}