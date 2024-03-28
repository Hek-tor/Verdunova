import { ViewForController } from "../../views/viewForController.js";
import { div, img } from "../../libraries/html.js";

export class CartView extends ViewForController {
    constructor(controller, parent) {
        super(controller, parent);
        this.container.className = 'cartContainer';
        this.cartButton = div(this.container, { className: 'cartButton', onclick: this.cartSection.bind(this) });
        this.iconButton = img(this.cartButton, { className: 'cartIcon' });
        this.iconButton.src = '../assets/icons/cart.webp';
        this.iconButton.setAttribute('alt', 'Botón para abrir el carrito de compras');
        this.activeButtonEvent();
    }

    activeButtonEvent() {
        window.onscroll = function () {
            let scroll = document.documentElement.scrollTop || document.body.scrollTop;
            this.cartButton.style.display = scroll > 500 ? "block" : "none";
        }.bind(this);
    }

    cartSection() {
        this.cartSection = div(this.container, { className: 'cartView' });
    }
}