// src/modules/Buyer/features/track-order/trackOrderSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderHistory } from "../../lib/track-order/api";
import { Order } from "@/types/orders";

interface TrackOrderState {
  orders: Order[];
  total_order: number;
  loading: boolean;
  error: string | null;
}

const initialState: TrackOrderState = {
  orders: [],
  total_order: 0,
  loading: false,
  error: null,
};

export const getOrderHistory = createAsyncThunk(
  "trackOrder/getOrderHistory",
  async (token: string, { rejectWithValue }) => {
    try {
      const data = await fetchOrderHistory();
      return data;
    } catch (error: any) {
      // Return a custom error message
      return rejectWithValue(
        "Failed to fetch order history. Please try again later."
      );
    }
  }
);

const trackOrderSlice = createSlice({
  name: "trackOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total_order = Number(action.payload.total_order);
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loading = false;
        // Ensure action.payload is a string before assigning
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An unexpected error occurred.";
      });
  },
});

export default trackOrderSlice.reducer;
