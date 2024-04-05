import { div, img, p } from "../../libraries/html.js";

export class CartSectionView {
    constructor(itemsAdded) {
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
        localStorage.removeItem('cart');
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
            grow: 'fullscreen',
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
