import { div } from "../libraries/html.js";
import { View } from "./view.js";

export class ViewForController extends View {
    constructor(controller, parent) {
        super(parent);
        this.controller = controller;
        this.elementContainer = div(parent, { className: 'elementContainer' });
    }
}