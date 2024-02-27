'use strict';
import { div } from "./libraries/html.js";
import { NavbarController } from "./controllers/navbarController/navbarController.js";
import { UserPageController } from "./controllers/UserPageController/UserPageController.js";


export class AppManager {
    constructor() {
        this.mainContainer = div(document.body, { className: 'mainContainer' });

        this.navbarController = new NavbarController(this, this.mainContainer);
        this.userPageController = new UserPageController(this, this.mainContainer);
    }
}