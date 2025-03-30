import { Link } from "react-router-dom";
import { Order } from "@/types/orders";
import { statusToClassName } from "@/modules/Buyer/lib/track-order/utils";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const detailsUrl = `view/${order.orderId ?? "unknown"}`;

  return (
    <Link to={detailsUrl} className="block">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-md p-6 rounded-md hover:bg-gray-50 transition-colors">
        <div>
          <h2 className="font-bold text-gray-800">
            Order #{order.orderNo ?? "N/A"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {order.product.description ?? "No description available"}
          </p>
        </div>
        <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
          <span
            className={`text-sm font-semibold px-2 py-1 rounded-md inline-block ${statusToClassName(
              order.order_status ?? "pending"
            )}`}
          >
            {order.order_status === "accepted"
              ? "Accepted"
              : order.order_status === "cancelled"
                ? "Cancelled"
                : "Pending"}
          </span>
          <span className="text-xs text-gray-400 mt-1">
            {order.created_at ?? "Unknown Date"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
