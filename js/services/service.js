export class Service {
    constructor(controller) {
        this.controller = controller;
    }

    getURL() {
        const production = 'https://verdunova-api.vercel.app';
        const development = 'http://localhost:3000';
        return development;
    }
}