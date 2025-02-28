import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setPriceRange } from "../filter/filterSlice";
import axios from "axios";
import { RootState } from "@/store/store";

interface Product {
  size: number[];
  color: string[];
  id: string;
  brand: string;
  price: number;
  model: string;
  description: string;
  storeName: string;
  storeAvatar: string;
  image: string;
  quantity: number;
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
  async (_, { dispatch, getState }) => {
    try {
      const { token } = (getState() as RootState).auth;
      console.log(token);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}list`,
        { headers: { "auth-token": token } }
      );
      // const response = await axios.get("https://fakestoreapi.com/products");
      // console.log("res:", response);
      const data = response.data.sneakers;

      // Extract min & max prices
      const prices = data.map((p: any) => p.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      // Set price range dynamically in Redux store
      dispatch(setPriceRange([minPrice, maxPrice]));

      console.log(data);
      return data.map((product: any) => ({
        ...product,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
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
