import { useState } from "react";
import { submitFeedback } from "../../../lib/track-order/api";

interface VisualVerificationFeedbackProps {
  orderId: string;
}

const VisualVerificationFeedback: React.FC<VisualVerificationFeedbackProps> = ({
  orderId,
}) => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await submitFeedback(orderId, feedback);
      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit feedback");
    }
  };

  if (submitted) {
    return <p className="text-green-600">Feedback submitted. Thank you!</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Provide feedback on the verification process..."
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default VisualVerificationFeedback;
