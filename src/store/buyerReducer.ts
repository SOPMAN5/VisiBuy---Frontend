import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "@/modules/Buyer/features/cart/cartSlice";
import productReducer from "@/modules/Buyer/features/product/productSlice";
import filterReducer from "@/modules/Buyer/features/filter/filterSlice";
const buyerReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  filters: filterReducer,
});
export default buyerReducer;
