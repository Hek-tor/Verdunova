import { Controller } from "../Controller.js";
import { FooterView } from "./footerView.js";

export class Footer extends Controller {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.view = new FooterView(this, parent);
    }

    messageController() {
        const messageURL = 'https://walink.co/3b5c02';
        window.open(messageURL);
    }
}