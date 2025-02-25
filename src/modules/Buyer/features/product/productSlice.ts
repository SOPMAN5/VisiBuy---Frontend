import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setPriceRange } from "../filter/filterSlice";

interface Product {
  sizes: number[];
  color: string[];
  id: number;
  name: string;
  price: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
};

// Fetch products from API
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { dispatch }) => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    // Extract min & max prices
    const prices = data.map((p: any) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Set price range dynamically
    dispatch(setPriceRange([minPrice, maxPrice]));

    console.log(data);
    return data.map((product: any) => ({
      ...product,
    }));
  }
);

// export const fetchProducts = createAsyncThunk("products/fetch", async () => {
//   const response = await fetch("https://fakestoreapi.com/products");
//   return (await response.json()) as Product[];
// });

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
