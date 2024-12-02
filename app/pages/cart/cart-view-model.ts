import { Observable } from '@nativescript/core';
import { CartItem } from '../../shared/models/product.model';
import { Frame } from '@nativescript/core';

export class CartViewModel extends Observable {
    private _cartItems: Array<CartItem> = [];

    constructor() {
        super();
    }

    get cartItems(): Array<CartItem> {
        return this._cartItems;
    }

    get total(): number {
        return this._cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    onIncreaseQuantity(args) {
        const item = args.object.bindingContext;
        item.quantity++;
        this.notifyPropertyChange('cartItems', this._cartItems);
        this.notifyPropertyChange('total', this.total);
    }

    onDecreaseQuantity(args) {
        const item = args.object.bindingContext;
        if (item.quantity > 1) {
            item.quantity--;
            this.notifyPropertyChange('cartItems', this._cartItems);
            this.notifyPropertyChange('total', this.total);
        }
    }

    onRemoveItem(args) {
        const item = args.object.bindingContext;
        const index = this._cartItems.indexOf(item);
        this._cartItems.splice(index, 1);
        this.notifyPropertyChange('cartItems', this._cartItems);
        this.notifyPropertyChange('total', this.total);
    }

    onCheckout() {
        Frame.topmost().navigate('pages/checkout/checkout-page');
    }
}