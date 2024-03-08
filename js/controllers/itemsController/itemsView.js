import { ViewForController } from "../../views/viewForController.js";

export class ItemsView extends ViewForController {
    constructor(controller, parent) {
        super(controller, parent);
        this.container.className = 'itemsContainer';
        
    }
}