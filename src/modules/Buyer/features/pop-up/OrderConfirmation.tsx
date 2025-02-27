import React from "react";

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    orderId: string;
    items: {
      id: number;
      name: string;
      quantity: number;
      price: number;
    }[];
    totalAmount: number;
    paymentStatus: string;
  };
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  isOpen,
  onClose,
  orderDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-lg font-semibold mb-2'>Order Confirmation</h2>
        <p className='text-gray-600'>
          Your order has been placed successfully!
        </p>

        <div className='mt-4'>
          <p className='font-semibold'>Order ID: {orderDetails.orderId}</p>
          <p className='text-green-600 font-semibold'>
            Payment: {orderDetails.paymentStatus}
          </p>
        </div>

        <div className='mt-4'>
          <h3 className='font-semibold'>Order Summary:</h3>
          {orderDetails.items.map((item) => (
            <div
              key={item.id}
              className='flex justify-between text-sm text-gray-700 border-b py-1'
            >
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>₦{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className='mt-4 text-lg font-bold text-green-700'>
          Total: ₦{orderDetails.totalAmount}
        </div>

        <button
          onClick={onClose}
          className='mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
