

import { useParams } from "react-router-dom";

const BuyerOrderDetailsPage = () => {
  const { orderId } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>
      <p>Order ID: {orderId}</p>
      {/* Additional details or fetch logic for the specific order */}
    </div>
  );
};

export default BuyerOrderDetailsPage;
