import { section } from "../libraries/html.js";

export class View {
    constructor(parent) {
        this.parent = parent;
        this.container = section(parent, null);
    }
}