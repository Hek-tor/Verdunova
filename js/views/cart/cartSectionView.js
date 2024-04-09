import { div, img, p } from "../../libraries/html.js";

export class CartSectionView {
    constructor(itemsAdded) {
        this.itemsAdded = itemsAdded;
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

    processOrder() {
        let totalPrice = this.finalPrice;
        if (totalPrice > 0) {
            let checkOut = this.getCheckOut();
            let usserInfo = this.getUsserInfo(totalPrice);
            console.log(checkOut);
            //Enviar al controller, luego crear un objeto con los datos de la compra, del controller al services.
            //Datos: [Cliente, ubicacion,numero,precio total] Carlos, Turrialba, 40404040, 16.000
            localStorage.removeItem('cart');
        }
    }

    getCheckOut() {
        let newOrder = {};
        this.itemsAdded.forEach(purchaseItem => {
            newOrder.quantity = purchaseItem.quantity;
            newOrder.category = purchaseItem.category;
            newOrder.name = purchaseItem.name;
        });
        return newOrder;
    }

    getUsserInfo(price) {
        console.log(price);
    }

    showItemsContent(items) {
        this.finalPrice = 0;
        items.forEach(item => {
            let itemDiv = div(this.content, { className: 'itemDiv' });
            let image = img(itemDiv, { className: 'imageCart' }).src = `${item.image}`;
            let itemLabel = div(itemDiv, { className: 'itemLabel' });
            let name = p(itemLabel, { className: 'itemName' });
            let cost = p(itemLabel, { className: 'itemCost' });
            name.textContent = `${item.quantity} ${item.category} de ${item.name}`;
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
            if (result.isConfirmed) {
                this.processOrder();
            }
        });
    }
}
