/// <reference types="vite/client" />

interface User {
  id: number;
  name: string;
  email: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
}
