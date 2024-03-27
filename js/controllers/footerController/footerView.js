import { h3, div, p } from "../../libraries/html.js";
import { ViewForController } from "../../views/viewForController.js";

export class FooterView extends ViewForController {
    constructor(controller, parent) {
        super(controller, parent);
        this.container.className = 'footerContent';
        this.container.id = 'Entregas';
        this.delivery = h3(this.container, { className: 'titleSection' }).textContent = 'Entregas';
        this.line = div(this.container, { className: 'lineDecoration' });

        this.description = p(this.container, { className: 'description' });
        this.description.textContent = `Puedes realizar tu pedido por medio de Verdunova cualquier 
        día, excepto los martes, que es cuando hacemos entregas.`;

        this.details = div(this.container, { className: 'description' });
        this.details.innerHTML = `
        ✔️ Pago por SINPE al 68892735.<br>
        ✔️ Precios actualizados.<br>
        ✔️ Consultas al WhatsApp 88031788.`;

        this.contactButton = div(this.container, { className: 'contactButton', innerHTML: 'Consultar', onclick: this.sendMessage.bind(this) });
    }

    sendMessage() {
        this.controller.messageController();
    }
}