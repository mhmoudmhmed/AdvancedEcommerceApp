import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instanceAPI, { BASE_API_URL } from "../Api/baseApi";
import { Product } from "../types/appTypes";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await instanceAPI.get<Product[]>(
      `${BASE_API_URL}/4454bad0?count=20&key=d8691d10`
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const uniqueProducts = action.payload.filter(
          (product: Product, index: number, self: Product[]) =>
            index === self.findIndex((p: Product) => p.id === product.id)
        );
        state.items = uniqueProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
