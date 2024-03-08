import { ItemCard } from '../../models/itemCard.js'
import { Service } from '../service.js'

export class ItemService extends Service {
    constructor(controller) {
        super(controller);
    }

    getProducts() {
        const url = './js/services/itemServices/items.json';

        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            response.json().then(data => {
                let itemList = [];
                data.products.forEach((item) => {
                    let itemCard = new ItemCard(item.id, item.imageURL, item.name, item.price, item.details);
                    itemList.push(itemCard);
                });
                this.controller.receiveProducts(itemList);
            })
        }).catch(err => {
            console.warn('Parsing json:', err);
        });
    }
}