
import { TOrderStatus } from "../../../../../types/status";

type FilterStatus = TOrderStatus | "all";

interface OrderStatusButtonsProps {
  currentStatus: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
}

const statuses: FilterStatus[] = [
  "all",
  "accepted",
  "dispatched",
  "pending",
  "delivered",
  "cancelled",
];

const OrderStatusButtons: React.FC<OrderStatusButtonsProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {statuses.map((status) => {
        const displayLabel =
          status === "all"
            ? "All"
            : status.charAt(0).toUpperCase() + status.slice(1);

        return (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              currentStatus === status
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            } hover:bg-blue-200 hover:text-blue-800 transition-colors`}
          >
            {displayLabel}
          </button>
        );
      })}
    </div>
  );
};

export default OrderStatusButtons;
