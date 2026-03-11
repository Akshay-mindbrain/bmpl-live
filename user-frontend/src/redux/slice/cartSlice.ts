import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock?: string; // Made optional as it wasn't strictly required before
  bv?: number; // Added Business Volume
  qty: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      // If qty is provided in payload (e.g. 1 or -1), use it. Otherwise default to 1.
      const qtyToAdd = action.payload.qty ?? 1;

      if (existing) {
        existing.qty += qtyToAdd;
        if (existing.qty < 1) existing.qty = 1;
      } else {
        // For new items, always start with 1, unless specified
        state.items.push({ ...action.payload, qty: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
