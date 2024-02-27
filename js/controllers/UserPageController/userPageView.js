import { div } from "../../libraries/html.js";
import { ViewForController } from "../../views/viewForController.js";

export class UserPageView extends ViewForController {
    constructor(controller, parent) {
        super(controller, parent);
        this.container.className = 'userPageController';

        this.hero = div(this.container, { className: 'hero' });
        this.hero.textContent = `Entregas a domicilio de frutas y verduras frescas en Cartago y San José.`;
    }
}