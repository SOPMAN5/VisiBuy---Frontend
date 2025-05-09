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
      <div className="flex flex-col bg-white shadow-md p-6 rounded-md hover:bg-gray-50 transition-colors gap-1">
        {/* Row 1: Order number + status */}
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold font-Montserrat text-xl">
            Order #{order.orderNo ?? "N/A"}
          </h2>
          <span
            className={`text-sm md:text-lg font-normal font-OpenSans px-2 py-1 rounded-md ${statusToClassName(
              order.order_status ?? "pending"
            )}`}
          >
            {order.order_status === "accepted"
              ? "Accepted"
              : order.order_status === "cancelled"
                ? "Cancelled"
                : "Pending"}
          </span>
        </div>

        {/* Row 2: Description */}
        <p className="text-lg font-OpenSans text-gray-600 line-clamp-1">
          {order.product.description ?? "No description available"}
        </p>

        {/* Row 3: Timestamp */}
        <div className="flex justify-end">
          <span className="text-xs font-OpenSans text-gray-400">
            {order.formattedDate ?? "Unknown Date"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
