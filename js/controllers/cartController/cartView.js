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

    async confirmOrder(order, price) {
        let form = this.newForm(price);
        let result = await Swal.fire({
            title: "Datos de envío",
            text: "Ingrese sus datos para finalizar el pedido y poder recibir su orden",
            heightAuto: true,
            showConfirmButton: true,
            focusConfirm: true,
            confirmButtonColor: "#F77F00",
            confirmButtonText: "Confirmar compra",
            showCloseButton: true,
            html: form,
            customClass: {
                popup: 'checkOut',
                input: 'checkInput',
                title: 'checkTittle',
                closeButton: 'closeCheckOut',
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
        }).then(result => {
            if (result.isConfirmed) {
                let userData = result.value;
                const formValidator = (userInputs) => userInputs.trim() !== '';
                const isApproved = userData.every(formValidator);
                if (isApproved) {
                    this.controller.cleanCart();
                    this.controller.successOrder(order, userData, price);
                } else {
                    this.rejectOrderView('DATOS INCOMPLETOS');
                }
            }
        });
    }

    showSuccessOrder() {
        Swal.fire({
            icon: "success",
            title: 'Pedido enviado correctamente',
            text: 'Puedes cancelar el monto por sinpe móvil o en efectivo cuando se te entregue el pedido.',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
                popup: 'successOrder',
                title: 'tittleSuccess',
            },
            showClass: {
                popup: `animate__animated animate__zoomIn animate__faster`
            },
            hideClass: {
                popup: `animate__animated animate__flipOutX animate__faster`
            },
        });
    }

    rejectOrderView(alert) {
        Swal.fire({
            icon: "error",
            title: alert,
            text: `Por favor, asegúrese de completar todos los datos del formulario para poder procesar tu pedido correctamente. ¡Gracias!`,
            showConfirmButton: false,
            timer: 3200,
            customClass: {
                popup: 'rejectCheckOut',
                title: 'tittleReject',
            },
            showClass: {
                popup: `animate__animated animate__headShake animate__faster`
            },
        }).then(() => {
            this.controller.rejectOrder();
        })
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