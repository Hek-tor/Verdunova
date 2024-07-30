import { ItemCard } from '../../models/itemCard.js';
import { Service } from '../service.js';

export class ItemService extends Service {
    constructor(controller) {
        super(controller);
        this.authInstance = this.getAuthInstance();
    }

    getProducts() {
        this.authInstance.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const url = `${this.getURL()}/products`;
                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(response => {
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
                catch (error) {
                    console.error('Error fetching products:', error);
                }
            } else {
                console.log('User is not authenticated');
            }
        });
    }

}
