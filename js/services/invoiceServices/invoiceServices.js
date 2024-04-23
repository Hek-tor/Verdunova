import { Service } from "../service.js";

export class InvoiceService extends Service {
    constructor(controller) {
        super(controller);
    }

    sendInvoice(userInvoice) {
        let dataOrder = userInvoice;
    }
}