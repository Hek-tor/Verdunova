import { View } from "./view.js";

export class ViewForController extends View {
    constructor(controller, parent) {
        super(parent);
        this.controller = controller;
    }
}