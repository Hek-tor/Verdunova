import { img, p } from "../../libraries/html.js";
export class CartSectionView {
    constructor(itemsAdded) {
        let cartContent = this.displayItems(itemsAdded);
        this.showModal(cartContent);
    }

    displayItems(items) {
        const empty = 0;
        this.content = document.createElement('div');
        this.content.className = 'modalContent';
        if (items.length === empty) {
            this.iconForEmpty = img(this.content, { className: 'iconEmpty' });
            this.modalMessage = p(this.content, { className: 'modalMessage' });
            this.iconForEmpty.src = '../../assets/icons/empty.webp';
            this.modalMessage.textContent = 'Aún no has agregado ningún producto.';
            this.content.appendChild(this.modalMessage);
            this.content.appendChild(this.iconForEmpty);
        } else {
            console.log(items);
        }
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
                localStorage.removeItem('cart');
            };
        });
    }
}