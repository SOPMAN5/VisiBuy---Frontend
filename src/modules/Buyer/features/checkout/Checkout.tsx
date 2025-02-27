import React, { useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import OrderConfirmation from "../pop-up/OrderConfirmation";

const Checkout = () => {
  const dispatch = useDispatch();

  // Get user & cart details from Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.buyer.cart);

  // Compute total amount dynamically
  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Order state
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    // Generate unique order ID
    orderId: "VISI-" + Math.floor(100000 + Math.random() * 900000),
    items: cart.items,
    totalAmount,
    paymentStatus: "Pending",
  });

  // Flutterwave payment config
  const flutterwaveConfig = {
    public_key:
      process.env.REACT_APP_FLW_PUBLIC_KEY || "FLWPUBK_TEST-XXXXXXXXX",
    // Unique transaction reference
    tx_ref: "VISIBUY-" + Date.now(),
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email ?? "default@example.com",
      phone_number: user?.phone ?? "0000000000",
      name: user?.fullName ?? "John Doe",
    },
    customizations: {
      title: "VisiBuy Order Payment",
      description: "Complete your order payment",
      logo: "/logo.png", // Ensure logo is correctly referenced
    },
    callback: (response: any) => {
      if (response.status === "successful") {
        setOrderDetails((prev) => ({
          ...prev,
          paymentStatus: "Paid",
        }));
        setIsOrderPlaced(true);
      }
      closePaymentModal(); // Close modal after payment
    },
    onClose: () => {
      console.log("Payment modal closed"); // ✅ Add this to handle modal close event
    },
  };

  return (
    <div className='p-6'>
      <h2 className='text-xl font-semibold'>Complete Your Order</h2>

      <FlutterWaveButton
        {...flutterwaveConfig}
        className='mt-4 bg-green-600 text-white px-4 py-2 rounded-lg'
      />

      <OrderConfirmation
        isOpen={isOrderPlaced}
        onClose={() => setIsOrderPlaced(false)}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default Checkout;
