import { Service } from "../service.js";

export class InvoiceService extends Service {
    constructor(controller) {
        super(controller);
    }

    sendInvoice(userInvoice) {
        let dataOrder = userInvoice;
        let url = `${this.getURL()}/invoice`;
        let params = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(dataOrder),
        };
        fetch(url, params).then(response => {
            response.json()
                .catch(error => {
                    console.log(error);
                });
        }).catch(err => {
            console.log(err);
        });
    }
}