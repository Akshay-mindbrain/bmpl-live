export interface User {
    id: number;
    name: string;
    email: string;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    qty: number;
}

export interface CartState {
    items: CartItem[];
}
