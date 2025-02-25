import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/ui/Button";

import CartSummaryItem from "./CartSummaryItem";

const CartSummary = () => {
  const cartItems = useSelector((state: RootState) => state.buyer.cart.items);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);

  const DELIVERY_FEE = 1000;
  const VAT = 200;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + DELIVERY_FEE + VAT;

  return (
    <div className='max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-lg md:text-xl font-semibold mb-4'>Cart Summary</h2>
      <div className='space-y-4'>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartSummaryItem key={item.id} item={item} />)
        ) : (
          <p className='text-gray-500 text-center'>Your cart is empty.</p>
        )}
      </div>

      <div className='mt-4'>
        <button
          onClick={() => setShowDeliveryDetails(!showDeliveryDetails)}
          className='text-sm font-medium flex items-center gap-2'
        >
          {showDeliveryDetails
            ? "▼ Hide Delivery Details"
            : "▶ Add Delivery Details"}
        </button>
        {showDeliveryDetails && (
          <div className='mt-2 space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span>Delivery</span>
              <span>#{DELIVERY_FEE}</span>
            </div>
            <div className='flex justify-between'>
              <span>VAT</span>
              <span>#{VAT}</span>
            </div>
          </div>
        )}
      </div>

      <div className='mt-4 border-t pt-4 text-sm'>
        <div className='flex justify-between'>
          <span>Sub Total</span>
          <span>#{subtotal}</span>
        </div>
        <div className='flex justify-between font-semibold text-lg'>
          <span>Total</span>
          <span>#{total}</span>
        </div>
      </div>

      <div className='mt-4 flex justify-between'>
        <Button variant='outline' className='w-1/2 mr-2'>
          Cancel
        </Button>
        <Button
          variant='default'
          className='w-1/2 bg-green-500 hover:bg-green-600'
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
