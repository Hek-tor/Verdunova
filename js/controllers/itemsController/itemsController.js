import { Controller } from "../Controller.js";
import { ItemsView } from "./itemsView.js";
import { ItemService } from "../../services/itemServices/itemServices.js";

export class ItemsController extends Controller {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.service = new ItemService(this);
        this.service.getProducts();
        this.view = new ItemsView(this, parent);
        this.view.parent.addEventListener('productSelected', this.productSelected.bind(this));
        this.view.container.className = 'itemsController';
        this.view.container.id = 'Verduras';
    }

    receiveProducts(itemList) {
        this.view.showProductsUI(itemList);
    }

    productSelected(event) {
        this.view.showProductSelected(event);
    }

    addProduct(name, quantityText, price, category, quantity, image, id) {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingItem = this.cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.purchaseCost += price * quantity;
            let newText = String(quantityText).replace(/\d+(\.\d+)?/, existingItem.quantity);
            if (Number.isInteger(parseFloat(quantity))) {
                existingItem.quantityText = `${newText} de`;
            } else {
                existingItem.quantityText = `${existingItem.quantity} kilos de`;
            }
        } else {
            let purchaseCost = parseInt((price * quantity), 10);
            let newItem = {
                name: name,
                category: category,
                image: image,
                quantity: quantity,
                quantityText: quantityText,
                purchaseCost: purchaseCost,
                id: id
            };
            this.cart.push(newItem);
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}