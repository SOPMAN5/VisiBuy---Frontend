import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import ViewAll from "../../modules/Buyer/features/track-order/components/ViewAll";
import VerifyButton from "../../modules/Buyer/features/track-order/components/VerifyButton";
import VisualVerificationModal from "../../modules/Buyer/features/track-order/components/VisualVerificationModal";
import FeedbackModal from "../../modules/Buyer/features/track-order/components/FeedbackModal";

const BuyerOrderDetailsPage: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [verificationStatus, setVerificationStatus] = useState<
    "awaiting" | "verified"
  >("awaiting");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isButtonVerified, setIsButtonVerified] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleVerifyClick = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowVerificationModal(true);
    }, 1000);
  };

  const handleVerificationNo = () => {
    setShowVerificationModal(false);
  };

  const handleVerificationYes = () => {
    setShowVerificationModal(false);
    setVerificationStatus("verified");
    setIsButtonVerified(true);
    setShowFeedbackModal(true);
  };

  return (
    <div className="relative p-4 md:p-4">
      {/* Header: Back Button + Order ID + Status */}
      <div className="flex items-center justify-between mb-6 rounded-md max-w-6xl">
        <div className="flex items-center gap-3">
          <HiArrowLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl md:text-2xl font-bold">
            Order #{orderId || "1452589"}
          </h1>
        </div>
        <span
          className="px-2 py-1 rounded-xl text-sm font-semibold"
          style={{
            backgroundColor:
              verificationStatus === "verified" ? "#E0F2FE" : "#0284ff",
            color: verificationStatus === "verified" ? "#0284C7" : "white",
          }}
        >
          {verificationStatus === "verified"
            ? "Verified"
            : "Awaiting Verification"}
        </span>
      </div>

      {/* Order Details & View All */}
      <div className="lg:flex lg:justify-between gap-8">
        {/* Left Column: Order Details */}
        <div className="flex-1 bg-white p-4 space-y-4">
          {/* Order Information */}
          <div className="p-4">
            <div className="grid grid-cols-2 text-sm text-gray-600">
              <div className="space-y-2 font-semibold">
                <p>Buyer:</p>
                <p>Seller:</p>
                <p>Date & Time of Purchase:</p>
                <p>Transaction ID:</p>
                <p>Session ID:</p>
              </div>
              <div className="space-y-2 text-right">
                <p>Chinaza Emmanuel</p>
                <p>Chukwudi Stores</p>
                <p>14:32, Jan 24, 2025</p>
                <p>B9g9h8j5bjg</p>
                <p>8S9H3Spk9Hgh4hd</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="p-4">
            <div className="flex justify-between text-sm font-semibold text-gray-700 p-2 border-t border-gray-300">
              <p>1x Newest Versace Sneakers (#39,952)</p>
              <p>#14,000</p>
            </div>
            <div className="flex justify-between text-sm font-semibold text-gray-700 p-2 border-y border-gray-300">
              <p>1x Newest Versace Sneakers (#39,952)</p>
              <p>#14,000</p>
            </div>
          </div>

          {/* Verify Order */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-gray-700 font-semibold">
              Verify your Order
            </span>
            <VerifyButton
              isVerifying={isVerifying}
              isVerified={isButtonVerified}
              onClick={handleVerifyClick}
            />
          </div>

          {/* Delivery Info */}
          <div className="p-4 space-y-2">
            {/* Row 1: Delivery Left, Estimated Right */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="font-semibold text-black">
                50 mins left to delivery
              </span>
              <span className="text-gray-500">(Estimated: Jan 7, 1:30 PM)</span>
            </div>

            {/* Row 2: Assign Rider on the Right */}
            <div className="flex justify-end">
              <button className="text-sm hover:underline">
                + Assign to new rider
              </button>
            </div>

            {/* Row 3: Issues on the Left, Customer Care on the Right */}
            <div className="flex items-center justify-between text-sm ">
              <span>Experiencing issues with this order? Reach out to our</span>
              <button className="text-blue-600 font-semibold hover:underline">
                Customer Care
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: View All Component */}
        <div className="w-[250px]">
          <ViewAll onClick={() => alert("Clicked View all!")} />
        </div>
      </div>

      {/* Modals */}
      <VisualVerificationModal
        isOpen={showVerificationModal}
        onClose={handleVerificationNo}
        onYes={handleVerificationYes}
      />
      {showFeedbackModal && (
        <FeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
        />
      )}
    </div>
  );
};

export default BuyerOrderDetailsPage;
