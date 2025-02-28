// src/modules/buyer/features/track-order/components/ViewAll.tsx
import React from "react";

interface ViewAllProps {
  onClick?: () => void;
}

const ViewAll: React.FC<ViewAllProps> = ({ onClick }) => {
  return (
    <span
      className="text-sm text-blue-600 font-semibold hover:underline cursor-pointer"
      onClick={onClick}
    >
      View all
    </span>
  );
};

export default ViewAll;
