import { div } from "../libraries/html.js";

export class View {
    constructor(parent) {
        this.parent = parent;
        this.container = div(parent, null);
    }
}