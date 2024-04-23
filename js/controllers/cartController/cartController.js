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
        this.order = this.getOrder(items);
        this.price = price;
        this.view.confirmOrder(this.order, this.price);
    }

    successOrder(order, userData, price) {
        this.view.successOrder();
        let newInvoice = {
            orders: order,
            client: userData,
            totalPrice: price
        }
    }

    rejectOrder() {
        this.view.confirmOrder(this.order, this.price);
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

    deleteItem(deleteId, list) {
        this.cleanCart();
        list = list.filter(items => items.id !== deleteId);
        this.updateCart(list);
        return list;
    }

    cleanCart() {
        localStorage.removeItem('cart');
    }

    updateCart(updateItems) {
        localStorage.setItem('cart', JSON.stringify(updateItems));
    }
}