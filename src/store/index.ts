import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import paymentReducer from "./paymentSlice";
import tokenRefreshMiddleware from "../middleware/tokenRefreshMiddleware";

const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    payment: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenRefreshMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
