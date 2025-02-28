import React, { useState } from "react";
import { verifyOrder } from "../../../lib/track-order/api";
import { CheckCircle } from "lucide-react";

interface VerifyButtonProps {
  orderId: string;
}

const VerifyButton: React.FC<VerifyButtonProps> = ({ orderId }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "verified">("idle");

  const handleVerify = async () => {
    setStatus("loading");
    try {
      await verifyOrder(orderId);
      setStatus("verified");
    } catch (error) {
      console.error("Verification failed", error);
      setStatus("idle");
    }
  };

  return (
    <button
      onClick={handleVerify}
      disabled={status === "loading" || status === "verified"}
      className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 flex items-center gap-2"
    >
      {status === "loading" ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : status === "verified" ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        "Verify"
      )}
    </button>
  );
};

export default VerifyButton;
