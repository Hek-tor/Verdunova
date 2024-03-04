import { Controller } from "../Controller.js";
import { ItemsView } from "./itemsView.js";

export class ItemsController extends Controller {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.view = new ItemsView(this, parent);
        this.view.container.className = 'itemsController';
    }
}