import { div, p } from "../../libraries/html.js";

export class ProductView {
    constructor(parent, product) {
        this.parent = div(parent, { className: 'productView' });
        this.product = product;
        this.createImage(product.imageURL, `Producto: ${product.name}`);
        this.createLabel(product.name, product.price, product.details);
    }

    createImage(src, alt) {
        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.setAttribute('alt', alt);
        img.className = 'productImage';
        this.imageContainer = div(this.parent, { className: 'imageContainer' });
        this.imageContainer.appendChild(img);
        return this.imageContainer;
    }

    createLabel(name, price, details) {
        this.label = div(this.parent, { className: 'productLabel' });
        this.showName = p(this.label, { className: 'productName' }).textContent = name;
        this.showPrice = p(this.label, { className: 'productPrice' }).textContent = `₡ ${price}`;
        this.showDetails = details;
    }
}