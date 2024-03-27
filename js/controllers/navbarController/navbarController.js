import { Controller } from "../Controller.js";
import { NavbarView } from "./navbarView.js";

export class NavbarController extends Controller {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.view = new NavbarView(this, parent);
    }

    openNavbar() {
        this.view.createMobileMenu();
        this.moveFrom();
    }

    closeNavbar() {
        if (this.view.mobileMenu && this.view.mobileMenu.parentNode) {
            this.view.mobileMenu.parentNode.removeChild(this.view.mobileMenu);
            this.view.mobileMenu.classList.remove('nav');
            document.body.style.overflowY = "scroll";
        }
    }

    moveFrom() {
        gsap.from(this.view.mobileMenu, { x: -70, duration: 0.5 });
    }
}