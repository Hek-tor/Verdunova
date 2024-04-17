import { Controller } from "../Controller.js";
import { CartView } from "./cartView.js";

export class CartController extends Controller {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.view = new CartView(this, parent);
    }

    itemsAdded() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    processOrder(items, price) {
        this.cleanCart();
        let order = this.getOrder(items);
        let userData = this.getUserData(price);
    }

    getOrder(purchaseItems) {
        let newOrder = [];
        purchaseItems.forEach(purchaseItem => {
            let quantityText = purchaseItem.quantityText;
            let productName = purchaseItem.name;
            let order = `${quantityText} de ${productName}`;
            newOrder.push(order);
        });
        return newOrder;
    }

    getUserData(price) {
        this.view.showForm(price);
    }

    cleanCart() {
        localStorage.removeItem('cart');
    }
}