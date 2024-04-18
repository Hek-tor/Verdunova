import { div, img, p } from "../../libraries/html.js";
import { ViewForController } from "../viewForController.js";

export class CartSectionView extends ViewForController {
    constructor(controller, parent, itemsAdded) {
        super(controller, parent);
        this.itemsAdded = itemsAdded;
        this.finalPrice = 0;
        this.content = document.createElement('div');
        this.content.className = 'modalContent';
        const cartContent = this.displayItems(itemsAdded);
        this.showModal(cartContent);
    }

    displayItems(items) {
        const noItems = 0;
        items.length === noItems ? this.showEmptyContent() : this.showItemsContent(items);
        return this.content;
    }

    showItemsContent(items) {
        items.forEach(item => {
            let itemDiv = div(this.content, { className: 'itemDiv' });
            let image = img(itemDiv, { className: 'imageCart' }).src = `${item.image}`;
            let itemLabel = div(itemDiv, { className: 'itemLabel' });
            let name = p(itemLabel, { className: 'itemName' });
            let cost = p(itemLabel, { className: 'itemCost' });
            name.textContent = `${item.quantityText} ${item.name}`;
            cost.textContent = `${item.purchaseCost} colones`;
            this.finalPrice += item.purchaseCost;
        });
    }

    showEmptyContent() {
        let iconForEmpty = img(this.content, { className: 'iconEmpty' });
        let modalMessage = p(this.content, { className: 'modalMessage' });
        iconForEmpty.src = '../../assets/icons/empty.webp';
        modalMessage.textContent = 'Aún no has agregado ningún producto.';
        this.content.appendChild(modalMessage);
        this.content.appendChild(iconForEmpty);
        return this.content;
    }

    showModal(cartContent) {
        Swal.fire({
            title: `Lista de productos agregados`,
            position: 'center',
            heightAuto: true,
            html: cartContent,
            showConfirmButton: true,
            confirmButtonColor: "#298779",
            confirmButtonText: "Hacer pedido",
            showCloseButton: true,
            customClass: {
                popup: 'cartModal',
                title: 'cartTittle',
                closeButton: 'closeButtonModal',
                confirmButton: 'cartModalButton',
            },
            showClass: {
                popup: `animate__animated animate__slideInRight animate__faster`
            },
            hideClass: {
                popup: `animate__animated animate__slideOutRight animate__faster`
            },
        }).then((result) => {
            if (result.isConfirmed && this.finalPrice > 0) {
                this.controller.processOrder(this.itemsAdded, this.finalPrice);
            }
        });
    }
}
