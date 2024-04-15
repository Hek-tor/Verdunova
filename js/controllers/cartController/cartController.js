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
        let user = this.getUserData();
    }

    getOrder(purchaseItems) {
        let newOrder = [];
        purchaseItems.forEach(purchaseItem => {
            let quantity = purchaseItem.quantity;
            let category = purchaseItem.category;
            let productName = purchaseItem.name;
            let order = `${quantity} ${category} ${productName}`;
            newOrder.push(order);
        });
        return newOrder;
    }

    getUserData() {
        this.view.showForm();
    }

    cleanCart() {
        localStorage.removeItem('cart');
    }
}