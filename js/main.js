"use strict";
/**
* @name main.js
* @file Main directory for web app.
* @author Hector Emilio, hectoremdz@gmail.com
* @version 1.0.0
*/
import { AppManager } from "./appManager.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

window.addEventListener('load', init, false);

function init() {
    const appManager = new AppManager();
}
