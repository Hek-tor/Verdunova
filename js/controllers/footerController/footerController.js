import { Controller } from "../Controller.js";
import { FooterView } from "./footerView.js";

export class Footer extends Controller {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.view = new FooterView(this, parent);
    }
}