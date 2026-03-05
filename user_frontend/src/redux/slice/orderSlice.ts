import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    qty: number;
    image: string;
    category: string;
    stock: string;
}

export interface ShippingAddress {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
    phone?: string;
}

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    date: string;
    deliveryDate: string;
    status: "Processing" | "Packed" | "Picked" | "In Transit" | "Delivered" | "Cancelled";
    paymentMethod: string;
    shippingAddress: ShippingAddress;
}

interface OrderState {
    orders: Order[];
}

// Load orders from localStorage if available
const loadOrders = (): Order[] => {
    const saved = localStorage.getItem("orders");
    const parsedOrders: Order[] = saved ? JSON.parse(saved) : [];

    // Mock Data for Demo
    const mockOrders: Order[] = [
        {
            id: "ORD-8742-9921",
            items: [{ id: 101, name: "Whey Protein Isolate", price: 2800, qty: 1, image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/e237699d82134d109b85c3b994d59a58.jpg", category: "Supplements", stock: "In Stock" }],
            total: 2800,
            date: new Date().toISOString(),
            deliveryDate: new Date(Date.now() + 86400000 * 2).toISOString(),
            status: "In Transit",
            paymentMethod: "upi",
            shippingAddress: { fullName: "Rahul Verma", address: "123, MG Road", city: "Bangalore", zipCode: "560001" }
        },
        {
            id: "ORD-5555-1111",
            items: [{ id: 103, name: "Omega 3 Fish Oil", price: 999, qty: 1, image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/b624594c-9f06-4b82-8418-479da7623916.png", category: "Supplements", stock: "In Stock" }],
            total: 999,
            date: new Date().toISOString(),
            deliveryDate: new Date(Date.now() + 86400000 * 4).toISOString(),
            status: "Processing",
            paymentMethod: "cod",
            shippingAddress: { fullName: "Rahul Verma", address: "123, MG Road", city: "Bangalore", zipCode: "560001" }
        },
        {
            id: "ORD-9988-7766",
            items: [{ id: 104, name: "Creatine Monohydrate", price: 1200, qty: 1, image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/8f6f5053-9092-411f-8254-846870719888.png", category: "Supplements", stock: "In Stock" }],
            total: 1200,
            date: new Date().toISOString(),
            deliveryDate: new Date(Date.now() + 86400000 * 5).toISOString(),
            status: "Picked",
            paymentMethod: "cod",
            shippingAddress: { fullName: "Rahul Verma", address: "123, MG Road", city: "Bangalore", zipCode: "560001" }
        },
        // Completed Orders
        {
            id: "ORD-1234-5678",
            items: [{ id: 102, name: "Multivitamin Complex", price: 650, qty: 2, image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/388279860f4e43e28987bc310bc93902.jpg", category: "Vitamins", stock: "In Stock" }],
            total: 1300,
            date: new Date(Date.now() - 86400000 * 10).toISOString(),
            deliveryDate: new Date(Date.now() - 86400000 * 8).toISOString(),
            status: "Delivered",
            paymentMethod: "card",
            shippingAddress: { fullName: "Rahul Verma", address: "123, MG Road", city: "Bangalore", zipCode: "560001" }
        },
        {
            id: "ORD-1122-3344",
            items: [{ id: 105, name: "BCAA Energy", price: 1800, qty: 1, image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/1b359998-c67d-41a4-a2d7-347526715694.png", category: "Supplements", stock: "In Stock" }],
            total: 1800,
            date: new Date(Date.now() - 86400000 * 15).toISOString(),
            deliveryDate: new Date(Date.now() - 86400000 * 12).toISOString(),
            status: "Cancelled",
            paymentMethod: "upi",
            shippingAddress: { fullName: "Rahul Verma", address: "123, MG Road", city: "Bangalore", zipCode: "560001" }
        },
        {
            id: "ORD-4455-6677",
            items: [{ id: 106, name: "Peanut Butter 1kg", price: 450, qty: 1, image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/f3da219e-0129-4560-8f92-5d461524317b.png", category: "Foods", stock: "In Stock" }],
            total: 450,
            date: new Date(Date.now() - 86400000 * 30).toISOString(),
            deliveryDate: new Date(Date.now() - 86400000 * 28).toISOString(),
            status: "Delivered",
            paymentMethod: "cod",
            shippingAddress: { fullName: "Rahul Verma", address: "123, MG Road", city: "Bangalore", zipCode: "560001" }
        }
    ];

    // Merge mock orders if they don't already exist in the saved list (avoid duplicates)
    const orderIds = new Set(parsedOrders.map(o => o.id));
    const finalOrders = [...parsedOrders];

    mockOrders.forEach(mockOrder => {
        if (!orderIds.has(mockOrder.id)) {
            finalOrders.push(mockOrder);
        }
    });

    return finalOrders;
};

const initialState: OrderState = {
    orders: loadOrders(),
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        placeOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload); // Add new order to the beginning
            localStorage.setItem("orders", JSON.stringify(state.orders));
        },
    },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
