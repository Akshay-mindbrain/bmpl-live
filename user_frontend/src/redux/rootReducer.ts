import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/orderSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
