import { ItemCard } from '../../models/itemCard.js'
import { Service } from '../service.js'

export class ItemService extends Service {
    constructor(controller) {
        super(controller);
    }

    getProducts() {
        const url = `${this.getURL()}/products`;

        fetch(url).then(response => {
            response.json().then(data => {
                let itemList = [];
                data.forEach((item) => {
                    let itemCard = new ItemCard(item.id, item.imageURL, item.name, item.price, item.category);
                    itemList.push(itemCard);
                });
                this.controller.receiveProducts(itemList);
            })
        }).catch(err => {
            console.warn('Parsing json:', err);
        });
    }
}
