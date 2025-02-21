
import { Link } from "react-router-dom";

const PurchasingHistory  = () => {
  return (
    <div>
      {/* Header row with title and View all link */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">Purchasing History</h2>
        <Link to="/dashboard/buyer/history" className="text-blue-500 text-sm">
          View all
        </Link>
      </div>

      {/* White box below */}
      <div className="bg-white shadow-sm p-4 rounded-md">
        <p className="text-sm text-gray-600">
          This area can show stats or a summary of all purchases.
        </p>
      </div>
    </div>
  );
};

export default PurchasingHistory;
