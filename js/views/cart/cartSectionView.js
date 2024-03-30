export class CartSectionView {
    constructor(itemsAdded) {
        this.showModal(itemsAdded);
    }

    showModal(itemsAdded) {
        Swal.fire({
            title: `Lista de productos agregados`,
            grow: 'fullscreen',
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
        }).then(() => {
            if (result.isConfirmed) {

            };
        });
    }
}