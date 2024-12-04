import authReducer from "@/modules/Auth/features/slices";
import toastReducer from "@/ui/toastSlice";
import sellerReducer from "@/store/sellerReducer";
import buyerReducer from "@/store/buyerReducer";
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  seller: sellerReducer,
  buyer: buyerReducer,
});
export default rootReducer;
