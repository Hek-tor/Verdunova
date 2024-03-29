import { ViewForController } from "../../views/viewForController.js";
import { ProductView } from "../../views/productView/productView.js";


export class ItemsView extends ViewForController {
    constructor(controller, parent) {
        super(controller, parent);
        this.container.className = 'itemsContainer';
    }

    showProductsUI(products) {
        products.forEach(product => {
            const productView = new ProductView(this.container, product);
        });
    }

    showProductSelected(event) {
        let product = event.detail.ProductView.product;
        switch (product.category) {
            case 'kilo':
                this.showCategoryKilo(product);
                break;
            case 'unidad':
                this.showCategoryUnit(product);
                break;
            default:
                break;
        }
    };

    async showCategoryKilo(product) {
        let result = await Swal.fire({
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
            allowEnterKey: true,
            inputAutoFocus: false,
            inputPlaceholder: `Ingrese la cantidad  &#8675`,
            inputOptions: {
                0.5: "1/2 kilo",
                1: "Un kilo",
                1.5: "Kilo 1/2",
                2: "Dos kilos",
                2.5: "Dos kilos 1/2",
                3: "Tres kilos",
                otra: "Otra cantidad"
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
        }).then((result) => {
            if (result.isConfirmed) {
                let productQuantity = result.value;
                let name = product.name;
                let image = product.imageURL;
                let category = product.category;
                let price = product.price;
                this.sendProduct(name, price, category, productQuantity, image);
            };
        });
    }

    async showCategoryUnit(product) {
        let result = await Swal.fire({
            title: `¿Agregar ${(product.name).toLowerCase()}?`,
            imageUrl: `${product.imageURL}`,
            imageWidth: 320,
            imageHeight: 180,
            imageAlt: `Producto: ${product.name}`,
            showConfirmButton: true,
            confirmButtonColor: "#298779",
            confirmButtonText: "Agregar",
            showCloseButton: true,
            input: "number",
            allowEnterKey: true,
            inputPlaceholder: `Ingrese la cantidad`,
            inputAutoFocus: false,
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
        }).then((result) => {
            const limitQuantity = 30;
            if (result.isConfirmed && result.value <= limitQuantity) {
                let productQuantity = result.value;
                let name = product.name;
                let price = product.price;
                let category = product.category;
                let image = product.imageURL;
                this.sendProduct(name, price, category, productQuantity, image);
            };
        });
    }

    sendProduct(name, price, category, quantity, image) {
        if (quantity !== '' && quantity !== undefined) {
            Swal.fire({
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
                title: `${name} fue agregado al carrito.`,
                text: 'Ahí podrás confirmar y hacer tus pedidos.',
                customClass: { popup: 'productModal', title: 'modalTittle' },
                showClass: {
                    popup: `animate__animated animate__pulse animate__faster`
                },
                hideClass: {
                    popup: `animate__animated animate__bounceOut animate__faster`
                },
            });
            this.controller.addProduct(name, price, category, quantity, image);
        };
    };
}

