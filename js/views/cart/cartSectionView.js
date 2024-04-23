import { div, img, p } from "../../libraries/html.js";
import { ViewForController } from "../viewForController.js";

export class CartSectionView extends ViewForController {
    constructor(controller, parent, itemsAdded) {
        super(controller, parent);
        const displayCart = 'animate__animated animate__slideInRight animate__faster';
        this.content = document.createElement('div');
        this.content.className = 'modalContent';
        this.finalPrice = 0;
        this.cartContent = this.displayItems(itemsAdded);
        this.showModal(this.cartContent, itemsAdded, displayCart);
        this.eventDeleteItem(this.itemsAdded);
    }

    displayItems(items) {
        const noItems = 0;
        items.length === noItems ? this.showEmptyContent() : this.showItemsContent(items);
        return this.content;
    }

    eventDeleteItem(items) {
        this.content.addEventListener('click', (e) => {
            let itemsList = items;
            if (e.target.className == 'deleteIcon') {
                let deleteId = parseInt(e.target.getAttribute('item-id'));
                let newCart = this.controller.deleteItem(deleteId, itemsList);
                this.updateCart(newCart);
            };
        });
    }

    updateCart(newCartList) {
        const displayCart = 'animate__animated animate__bounceIn';
        this.finalPrice = 0;
        this.content.remove();
        this.content = document.createElement('div');
        this.content.className = 'modalContent';
        this.cartContent.remove();
        this.cartContent = this.displayItems(newCartList);
        this.eventDeleteItem(newCartList);
        this.showModal(this.cartContent, newCartList, displayCart);
    }

    showItemsContent(items) {
        items.forEach(item => {
            this.itemDiv = div(this.content, { className: 'itemDiv' });
            const image = img(this.itemDiv, { className: 'imageCart' }).src = `${item.image}`;
            const itemLabel = div(this.itemDiv, { className: 'itemLabel' });
            const name = p(itemLabel, { className: 'itemName' });
            const cost = p(itemLabel, { className: 'itemCost' });
            name.textContent = `${item.quantityText} ${item.name}`;
            cost.textContent = `${item.purchaseCost} colones`;
            this.deleteIcon = img(this.itemDiv, { className: 'deleteIcon' });
            this.deleteIcon.src = `../../assets/icons/delete-icon.svg`;
            this.deleteIcon.setAttribute('item-id', `${item.id}`);
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

    showModal(cartContent, itemsAdded, displayCart) {
        this.itemsAdded = itemsAdded;
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
                popup: displayCart,
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
