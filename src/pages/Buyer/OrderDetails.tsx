import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi"; 
import { ChevronRight } from "lucide-react";

const BuyerOrderDetailsPage: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // States for loading & pop-up
  const [isVerifying, setIsVerifying] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  // Handle "Verify" button click
  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate a short loading time
    setTimeout(() => {
      setIsVerifying(false);
      setShowVerification(true);
    }, 1500);
  };

  // Close the pop-up or handle "No"/"Yes"
  const handleCloseVerification = () => {
    setShowVerification(false);
  };

  return (
    <div className="relative p-4 md:p-8">
      {/* Top Row: Arrow Back, Order #, and Status */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <HiArrowLeft
            className="w-6 h-6 text-blue-600 cursor-pointer"
            onClick={() => navigate(-1)} // Go back to BuyerTrackOrderPage
          />
          <h1 className="text-xl md:text-2xl font-bold">
            Order #{orderId || "1452589"}
          </h1>
        </div>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-semibold">
          Awaiting Verification
        </span>
      </div>

      {/* Main Content: 2-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          {/* Buyer & Seller Info */}
          <div className="bg-white shadow-sm p-4 rounded-md">
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Buyer:</span> Chinaza Emmanuel
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Seller:</span> Chukwudi Stores
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Date & Time of Purchase:</span>{" "}
              14:32, Jan 24, 2025
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Transaction ID:</span> B9g9h8j5bjg
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Session ID:</span> 8S9H3Spk9Hgh4hd
            </p>
          </div>

          {/* Items */}
          <div className="bg-white shadow-sm p-4 rounded-md">
            <h2 className="font-semibold text-gray-800 mb-2">Items</h2>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <p>1x Newest Versace Sneakers Collections (#39,952)</p>
              <p>#14,000</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <p>1x Newest Versace Sneakers Collections (#39,952)</p>
              <p>#14,000</p>
            </div>
          </div>

          {/* "Verify your Order" Row */}
          <div className="bg-white shadow-sm p-4 rounded-md flex items-center justify-between">
            <span className="text-gray-700 font-semibold">
              Verify your Order
            </span>
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="relative bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
            >
              {/* Show spinner or "Verify" text */}
              {isVerifying ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Verify"
              )}
            </button>
          </div>

          {/* Delivery Info / CTA */}
          <div className="bg-white shadow-sm p-4 rounded-md space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">50 mins left to delivery</span>{" "}
              (Estimated delivery Jan 7, 1:30 PM)
            </p>
            <button className="text-blue-600 text-sm hover:underline">
              + Assign to new rider
            </button>
            <p className="text-sm text-gray-600">
              Experiencing any issue with your order? Reach out to our{" "}
              <button className="text-blue-600 font-semibold hover:underline">
                Customer Care
              </button>
            </p>
          </div>
        </div>

        {/* Right Column: Placeholder White Box */}
        <div className="w-full lg:w-64">
          <div className="bg-white shadow-sm p-4 rounded-md h-32">
            {/* Placeholder for anything else (like an image or additional info) */}
          </div>
        </div>
      </div>

      {/* Visual Verification Pop-up */}
      {showVerification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
            {/* Pop-up Header with arrow back */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ChevronRight
                  className="w-5 h-5 text-gray-600 cursor-pointer"
                  onClick={() => navigate(-1)} // Go back to order details page
                />
                <h2 className="text-lg font-semibold">Visual Verification</h2>
              </div>
            </div>

            {/* Product name */}
            <div className="mb-4">
              <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full">
                <option>Newest Versace Sneakers Collections (43,49,52)</option>
                {/* Additional items if needed */}
              </select>
            </div>

            {/* Product images row */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
              <img
                src="https://via.placeholder.com/120" // Example placeholder
                alt="product-1"
                className="w-24 h-24 object-cover rounded-md"
              />
              <img
                src="https://via.placeholder.com/120"
                alt="product-2"
                className="w-24 h-24 object-cover rounded-md"
              />
              <img
                src="https://via.placeholder.com/120"
                alt="product-3"
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>

            {/* Verification question */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Does this product match your order?
              </p>
              
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => setShowVerification(false)}
                className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                No
              </button>
              <button
                onClick={() => setShowVerification(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerOrderDetailsPage;
