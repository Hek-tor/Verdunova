import { div, p } from "../../libraries/html.js";
import { ViewForController } from "../../views/viewForController.js";

export class UserPageView extends ViewForController {
    constructor(controller, parent) {
        super(controller, parent);
        this.container.className = 'userPageController';
        this.container.id = 'Inicio';
        this.hero = div(this.container, { className: 'hero' });
        this.hero.innerHTML = `<h1>Entregas a domicilio de frutas y verduras frescas en Turrialba y Cartago.</h1>`;
        this.hero.setAttribute('alt', 'Banner principal con productos frescos.');
        this.benefits = div(this.container, { className: 'benefits' });
        this.benefits.innerHTML = '<p>Haga su pedido y reciba cada semana.</p>';
        this.callToActions = div(this.container, { className: 'callToActions' });
        this.ctaOne = div(this.callToActions, { className: 'benefitOption' });
        this.ctaTwo = div(this.callToActions, { className: 'benefitOption' });
        this.ctaThree = div(this.callToActions, { className: 'benefitOption' });

        this.createBenefitIcon('../assets/icons/alimentos-organicos.webp', 'Icono elegir verdura', this.ctaOne);
        this.createBenefitIcon('../assets/icons/nota.webp', 'Icono ordenar verdura', this.ctaTwo);
        this.createBenefitIcon('../assets/icons/delivery.webp', 'Icono recibir verdura', this.ctaThree);

        this.textBenefits = div(this.callToActions, { className: 'textBenefits' });
        this.text = p(this.textBenefits, { className: 'callToActionText' }).textContent = 'Elige';
        this.text = p(this.textBenefits, { className: 'callToActionText' }).textContent = 'Ordena';
        this.text = p(this.textBenefits, { className: 'callToActionText' }).textContent = 'Recibe';
        this.title = p(this.container, { className: 'title' }).textContent = 'Lista de productos:';
    }

    createBenefitIcon(src, alt, parentElement) {
        const benefitIcon = document.createElement('img');
        benefitIcon.setAttribute('src', src);
        benefitIcon.setAttribute('alt', alt);
        benefitIcon.className = 'benefitIcon';
        parentElement.appendChild(benefitIcon);
    }
}