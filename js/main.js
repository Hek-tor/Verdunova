"use strict";
/**
* @name main.js
* @file Main directory for web app.
* @author Hector Emilio, hectoremdz@gmail.com
* @version 1.0.0
*/
import '../css/styles.css';
import '../css/cartController.css';
import '../css/checkOutCart.css';
import '../css/userPageController.css';
import '../css/navbarController.css';
import '../css/itemsController.css';
import '../css/footerController.css';
import { AppManager } from "./appManager.js";

window.addEventListener('load', init, false);

function init() {
    const appManager = new AppManager();
}
