import { InvoiceService } from "../../services/invoiceServices/invoiceServices.js";
import { Controller } from "../Controller.js";
import { CartView } from "./cartView.js";


export class CartController extends Controller {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.service = new InvoiceService(this);
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
        let newInvoice = {
            orders: order,
            customer: userData,
            totalPrice: price
        }
        this.view.showSuccessOrder(newInvoice);
        this.service.sendInvoice(newInvoice);
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