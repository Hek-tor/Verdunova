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

    async showForm(price) {
        let form = this.newForm(price);
        const { value: formValues } = await Swal.fire({
            title: "Datos de envío",
            text: "Ingrese sus datos para finalizar el pedido y poder recibir su orden",
            heightAuto: true,
            showConfirmButton: true,
            inputAutoFocus: false,
            focusConfirm: false,
            confirmButtonColor: "#F77F00",
            confirmButtonText: "Confirmar compra",
            showCloseButton: true,
            html: form,
            customClass: {
                popup: 'checkOut',
                input: 'checkInput',
                title: 'checkTittle',
                closeButton: 'closeButtonModal',
                confirmButton: 'checkButton',
            },
            showClass: {
                popup: `animate__animated animate__zoomIn animate__faster`
            },
            hideClass: {
                popup: `animate__animated animate__zoomOut animate__faster`
            },
            preConfirm: () => {
                return [
                    document.getElementById("swal-name").value,
                    document.getElementById("swal-number").value,
                    document.getElementById("swal-location").value
                ];
            }
        });
        if (formValues) {
        }
    }

    newForm(price) {
        const name = `<input type=text"" id="swal-name" class="swal2-input swal-form" placeholder="Ingrese su nombre">`;
        const number = `<input type="number" id="swal-number" class="swal2-input swal-form" placeholder="Ingrese su número celular">`;
        const location = `<input type=text"" id="swal-location" class="swal2-input swal-form" placeholder="Ingrese su dirección">`;
        const total = `<p class="swal-price">Total a pagar: ₡ ${price}</p>`;
        let form = `${name} ${number} ${location} ${total}`;
        return form
    }
}