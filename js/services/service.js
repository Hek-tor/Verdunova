export class Service {
    constructor(controller) {
        this.controller = controller;
    }

    getURL() {
        return 'https://verdunova-api.vercel.app';
    }
}