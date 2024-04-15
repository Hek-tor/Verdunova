import { ViewForController } from "../../views/viewForController.js";
import { div, img } from "../../libraries/html.js";
import { CartSectionView } from "../../views/cart/cartSectionView.js";

export class CartView extends ViewForController {
    constructor(controller, parent) {
        super(controller, parent);
        this.container.className = 'cartContainer';
        this.cartButton = div(this.container, { className: 'cartButton', onclick: this.showCart.bind(this) });
        this.iconButton = img(this.cartButton, { className: 'cartIcon' });
        this.iconButton.src = '../assets/icons/cart-icon.svg';
        this.iconButton.setAttribute('alt', 'Botón para abrir el carrito de compras');
        this.activeButtonEvent();
    }

    activeButtonEvent() {
        window.onscroll = function () {
            let scroll = document.documentElement.scrollTop || document.body.scrollTop;
            this.cartButton.style.display = scroll > 240 ? "block" : "none";
        }.bind(this);
    }

    showCart() {
        let itemsAdded = this.getItemsAdded();
        let showCart = new CartSectionView(this.controller, this.parent, itemsAdded);
    }

    getItemsAdded() {
        return this.controller.itemsAdded();
    }

    async showForm() {
        const { value: formValues } = await Swal.fire({
            title: "Datos de envío",
            text: "Ingrese sus datos para finalizar el pedido y poder recibir su orden",
            html: this.newForm(),
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById("swal-name").value,
                    document.getElementById("swal-number").value
                ];
            }
        });
        if (formValues) {
            //send data
            Swal.fire(JSON.stringify(formValues));
        }
    }

    newForm() {
        return `<input type=text"" id="swal-name" class="swal2-input" placeholder="Ingrese su nombre"> 
        <input type="number" id="swal-number" class="swal2-input" placeholder="Ingrese su número celular">`;
    }
}