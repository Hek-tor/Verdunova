import { Controller } from "../Controller.js";
import { UserPageView } from "./userPageView.js";

export class UserPageController extends Controller {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.view = new UserPageView(this, parent);
        this.view.container.className = 'userPageController';
    }
}