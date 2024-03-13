'use strict';
import { section } from "./libraries/html.js";
import { NavbarController } from "./controllers/navbarController/navbarController.js";
import { UserPageController } from "./controllers/UserPageController/userPageController.js";
import { ItemsController } from "./controllers/itemsController/itemsController.js";
import { Footer } from "./controllers/footerController/footerController.js";


export class AppManager {
    constructor() {
        this.mainContainer = section(document.body, { className: 'mainContainer' });

        this.navbarController = new NavbarController(this, this.mainContainer);
        this.userPageController = new UserPageController(this, this.mainContainer);
        this.itemsController = new ItemsController(this, this.mainContainer);
        this.footerController = new Footer(this, this.mainContainer);
    }
}