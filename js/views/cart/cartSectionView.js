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
            let purchasedItems = this.itemsAdded;
            console.table(purchasedItems);
            console.log('Precio total de la compra: ' + totalPrice);
            //Enviar al controller, luego crear un objeto con los datos de la compra, del controller al services.
            //Producto: [cantidad, categoria, nombre] 5 kilos Aguacate, ect...
            //Datos: [Cliente, ubicacion,numero,precio total] Carlos, Turrialba, 40404040, 16.000
            localStorage.removeItem('cart');
        }
    }

    showItemsContent(items) {
        this.finalPrice = 0;
        items.forEach(item => {
            const itemDiv = div(this.content, { className: 'itemDiv' });
            this.image = img(itemDiv, { className: 'imageCart' }).src = `${item.image}`;

            const itemLabel = div(itemDiv, { className: 'itemLabel' });
            this.name = p(itemLabel, { className: 'itemName' });
            this.name.textContent = `${item.quantity} ${item.category} de ${item.name}`;
            this.cost = p(itemLabel, { className: 'itemCost' }).textContent = `${item.purchaseCost} colones`;
            this.finalPrice += item.purchaseCost;
            return itemDiv;
        });
    }

    showEmptyContent() {
        this.iconForEmpty = img(this.content, { className: 'iconEmpty' });
        this.modalMessage = p(this.content, { className: 'modalMessage' });
        this.iconForEmpty.src = '../../assets/icons/empty.webp';
        this.modalMessage.textContent = 'Aún no has agregado ningún producto.';
        this.content.appendChild(this.modalMessage);
        this.content.appendChild(this.iconForEmpty);
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
