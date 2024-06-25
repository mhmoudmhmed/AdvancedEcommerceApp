import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store;
