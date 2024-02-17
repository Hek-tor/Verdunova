import { ViewForController } from "../../views/viewForController.js";

export class UserPageView extends ViewForController {
    constructor(controller, parent) {
        super(controller, parent);
        this.container.className = 'userPageController';
    }
}