import { ViewForController } from "../../views/viewForController.js";
import { div, img } from "../../libraries/html.js";

export class CartView extends ViewForController {
    constructor(controller, parent) {
        super(controller, parent);
        this.cartButton = div(this.parent, { className: 'cartButton', onclick: this.cartSection.bind(this) });
        this.iconButton = img(this.cartButton, { className: 'cartIcon' });
        this.iconButton.src = '../assets/icons/cart.webp';
        this.iconButton.setAttribute('alt', 'Botón para abrir el carrito de compras');
        this.activeButtonEvent();
    }

    activeButtonEvent() {
        window.onscroll = function () {
            let scroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (scroll > 500) {
                this.cartButton.style.display = "block";
            } else {
                this.cartButton.style.display = "none";
            }
        }.bind(this);
    }

    cartSection() {
        console.log('Bienvenido al carrito de compras');
    }
}