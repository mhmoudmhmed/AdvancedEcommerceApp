import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../types/appTypes";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]) => {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: {
      reducer: (
        state,
        action: PayloadAction<{ product: Product; quantity: number }>
      ) => {
        const { product, quantity } = action.payload;
        const existingItemIndex = state.items.findIndex(
          (item) => item.product.id === product.id
        );
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex].quantity += quantity;
        } else {
          state.items.push({ product, quantity });
        }
        state.total = calculateTotal(state.items);
        AsyncStorage.setItem("cart", JSON.stringify(state));
      },
      prepare: (product: Product) => {
        return {
          payload: {
            product,
            quantity: 1,
          },
        };
      },
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload
      );
      if (existingItemIndex !== -1) {
        state.items.splice(existingItemIndex, 1);
      }
      state.total = calculateTotal(state.items);
      AsyncStorage.setItem("cart", JSON.stringify(state));
    },
    loadCart: (state, action: PayloadAction<CartState>) => {
      const consolidatedItems: CartItem[] = [];
      action.payload.items.forEach((item) => {
        const existingItemIndex = consolidatedItems.findIndex(
          (i) => i.product.id === item.product.id
        );
        if (existingItemIndex !== -1) {
          consolidatedItems[existingItemIndex].quantity += item.quantity;
        } else {
          consolidatedItems.push({ ...item });
        }
      });
      state.items = consolidatedItems;
      state.total = calculateTotal(consolidatedItems);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      AsyncStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, loadCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
