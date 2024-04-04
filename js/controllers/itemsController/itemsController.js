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
    
    addProduct(name, price, category, quantity, image) {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        let purchaseCost = price * quantity;
        let newItem = {
            name: name,
            category: category,
            image: image,
            quantity: quantity,
            purchaseCost: purchaseCost

        };
        this.cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}