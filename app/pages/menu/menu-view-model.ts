import { Observable } from '@nativescript/core';
import { Product } from '../../shared/models/product.model';
import { Frame } from '@nativescript/core';

export class MenuViewModel extends Observable {
    private _products: Array<Product> = [];
    private _cartItems: Array<Product> = [];
    private _selectedCategory: string = 'All';

    constructor() {
        super();
        this.loadProducts();
    }

    get products(): Array<Product> {
        return this._selectedCategory === 'All'
            ? this._products
            : this._products.filter(p => p.category === this._selectedCategory);
    }

    get cartItemCount(): number {
        return this._cartItems.length;
    }

    async loadProducts() {
        // In a real app, this would fetch from Firebase
        this._products = [
            {
                id: '1',
                name: 'Artisan Cappuccino',
                description: 'Rich espresso with silky steamed milk',
                price: 4.99,
                category: 'Coffee',
                image: '~/images/cappuccino.jpg',
                isVegetarian: true,
                isVegan: false
            },
            {
                id: '2',
                name: 'Almond Croissant',
                description: 'Buttery croissant filled with almond cream',
                price: 3.99,
                category: 'Pastries',
                image: '~/images/croissant.jpg',
                isVegetarian: true,
                allergens: ['nuts', 'gluten']
            }
            // Add more products...
        ];
        this.notifyPropertyChange('products', this._products);
    }

    onCategorySelect(args) {
        const button = args.object;
        this._selectedCategory = button.text;
        this.notifyPropertyChange('products', this.products);
    }

    onAddToCart(args) {
        const product = args.object.bindingContext;
        this._cartItems.push(product);
        this.notifyPropertyChange('cartItemCount', this.cartItemCount);
    }

    onCart() {
        Frame.topmost().navigate('pages/cart/cart-page');
    }
}