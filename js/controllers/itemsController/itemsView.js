import { ViewForController } from "../../views/viewForController.js";
import { ProductView } from "../../views/productView/productView.js";


export class ItemsView extends ViewForController {
    constructor(controller, parent) {
        super(controller, parent);
        this.container.className = 'itemsContainer';
    }

    showProductsUI(products) {
        products.forEach(product => {
            const productView = new ProductView(this.container, product)
        });
    }

    showProductSelected(event) {
        let product = event.detail.ProductView.product;
        Swal.fire({
            title: `¿Agregar ${(product.name).toLowerCase()}?`,
            imageUrl: `${product.imageURL}`,
            imageWidth: 320,
            imageHeight: 180,
            imageAlt: `Producto: ${product.name}`,
            showConfirmButton: true,
            confirmButtonColor: "#298779",
            confirmButtonText: "Agregar",
            showCloseButton: true,
            input: "select",
            inputPlaceholder: `Elija la cantidad`,
            inputOptions: {
                Cantidad: {
                    medioKilo: "1/2 kilo",
                    unKilo: "Un kilo",
                    kiloMedio: "Kilo 1/2",
                    dosKilos: "Dos kilos",
                    dosKilosMedio: "Dos kilos 1/2",
                    otra: "Otra cantidad"
                },
            },
            customClass: {
                popup: 'productModal',
                input: 'inputModal',
                title: 'modalTittle',
                image: 'modalImage',
                closeButton: 'closeButtonModal',
                confirmButton: 'confirmButtonModal',
            },
            showClass: {
                popup: `animate__animated animate__fadeInDown animate__faster`
            },
            hideClass: {
                popup: `animate__animated animate__bounceOut animate__faster`
            },
        }).then((result) => {
            if (result.isConfirmed) {
                //Usuario agrego algo
            }
        });
    }
}

