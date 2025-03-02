import React, { useState } from "react";

interface VisualVerificationFeedbackProps {
  onSubmit: () => void;
}

const VisualVerificationFeedback: React.FC<VisualVerificationFeedbackProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingClick = (value: number) => {
    setRating(value);
    onSubmit();
  };

  return (
    <div className="space-y-6 md:space-y-24 text-center">
      <h3 className="text-xl md:text-3xl font-bold text-black">
        Rate your experience with the visual verification system from 1-10
      </h3>
      {/* Grid layout: 5 per row on small screens, 10 per row on large screens */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-4 sm:gap-6 justify-center">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handleRatingClick(num)}
            className={`w-14 h-14 sm:w-16 sm:h-16 text-3xl font-bold rounded-full border border-green-600 
              flex items-center justify-center 
              ${rating === num ? "bg-green-600 text-white" : "text-black"} 
              hover:bg-green-600 hover:text-white transition`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VisualVerificationFeedback;
