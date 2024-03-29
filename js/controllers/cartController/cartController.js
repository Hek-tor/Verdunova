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
}