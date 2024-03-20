import { div, p } from "../../libraries/html.js";

export class ProductView {
    constructor(parent, product) {
        this.parent = div(parent, { className: 'productView' });
        this.product = product;
        this.parent.onclick = this.productSelected.bind(this);
        this.createImage(product.imageURL, `Producto: ${product.name}`);
        this.createLabel(product.name, product.price, product.category);
    }

    createImage(src, alt) {
        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.setAttribute('loading', 'lazy');
        img.setAttribute('alt', alt);
        img.className = 'productImage';
        this.imageContainer = div(this.parent, { className: 'imageContainer' });
        this.imageContainer.appendChild(img);
        return this.imageContainer;
    }

    createLabel(name, price, category) {
        this.label = div(this.parent, { className: 'productLabel' });
        this.showName = p(this.label, { className: 'productName' }).textContent = name;
        this.showPrice = p(this.label, { className: 'productPrice' }).textContent = `₡ ${price}`;
        this.showDetails = category;
    }

    productSelected() {
        const productSelectedEvent = new CustomEvent("productSelected", {
            bubbles: true,
            detail: { ProductView: this },
        });
        this.parent.dispatchEvent(productSelectedEvent);
    }
}