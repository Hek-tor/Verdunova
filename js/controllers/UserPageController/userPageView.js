import { div, p } from "../../libraries/html.js";
import { ViewForController } from "../../views/viewForController.js";

export class UserPageView extends ViewForController {
    constructor(controller, parent) {
        super(controller, parent);
        this.container.className = 'userPageController';

        this.hero = div(this.container, { className: 'hero' });
        this.hero.innerHTML = `<h1>Entregas a domicilio de frutas y verduras frescas en Cartago y San José.</h1>`;

        this.benefits = div(this.container, { className: 'benefits' });
        this.benefits.innerHTML = '<p>Haga su pedido y reciba cada semana.</p>';

        this.callToActions = div(this.container, { className: 'callToActions' });
        this.ctaOne = div(this.callToActions, { className: 'benefitOption' });
        this.ctaTwo = div(this.callToActions, { className: 'benefitOption' });
        this.ctaThree = div(this.callToActions, { className: 'benefitOption' });

        const benefitIconOne = document.createElement('img');
        benefitIconOne.setAttribute('src', '../assets/icons/alimentos-organicos.webp');
        benefitIconOne.className = 'benefitIcon';
        this.ctaOne.appendChild(benefitIconOne);

        const benefitIconTwo = document.createElement('img');
        benefitIconTwo.setAttribute('src', '../assets/icons/nota.webp');
        benefitIconTwo.className = 'benefitIcon';
        this.ctaTwo.appendChild(benefitIconTwo);

        const benefitIconThree = document.createElement('img');
        benefitIconThree.setAttribute('src', '../assets/icons/delivery.webp');
        benefitIconThree.className = 'benefitIcon';
        this.ctaThree.appendChild(benefitIconThree);

        this.textBenefits = div(this.container, { className: 'textBenefits' });
        this.text = p(this.textBenefits, { className: 'callToActionText' }).textContent = 'Elige';
        this.text = p(this.textBenefits, { className: 'callToActionText' }).textContent = 'Ordena';
        this.text = p(this.textBenefits, { className: 'callToActionText' }).textContent = 'Recibe';
    }
}