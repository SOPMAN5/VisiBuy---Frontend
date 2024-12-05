import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ProductSate } from "../../models/product";

const initialProductState: ProductSate = {
  products: [],
  selectedProduct: null,
};

const sellerProductSlice = createSlice({
  name: "seller_product",
  initialState: initialProductState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<IProduct | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSelectedProduct } = sellerProductSlice.actions;
export default sellerProductSlice.reducer;
