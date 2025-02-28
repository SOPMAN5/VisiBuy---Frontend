import React from "react";
import { ChevronLeft } from "lucide-react";

interface VisualVerificationModalProps {
  isOpen: boolean;
  onClose: () => void; 
  onYes: () => void; 
}

const VisualVerificationModal: React.FC<VisualVerificationModalProps> = ({
  isOpen,
  onClose,
  onYes,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg space-y-4">
        {/* Pop-up Header with chevron left */}
        <div className="flex items-center gap-3 mb-2">
          <ChevronLeft
            className="w-5 h-5 text-gray-600 cursor-pointer"
            onClick={onClose}
          />
          <h2 className="text-lg font-semibold">Visual Verification</h2>
        </div>

        {/* Product name */}
        <select className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500">
          <option>Newest Versace Sneakers Collections (43,49,52)</option>
        </select>

        {/* Product images row */}
        <div className="flex gap-2 overflow-x-auto">
          <img
            src="https://via.placeholder.com/120"
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
        <p className="text-sm font-semibold text-gray-700">
          Does this product match your order?
        </p>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            No
          </button>
          <button
            onClick={onYes}
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualVerificationModal;
