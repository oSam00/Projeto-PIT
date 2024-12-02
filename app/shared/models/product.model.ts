export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    allergens?: string[];
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered';
    deliveryAddress: string;
    createdAt: Date;
}