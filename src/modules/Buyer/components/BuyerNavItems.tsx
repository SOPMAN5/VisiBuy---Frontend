// src/modules/buyer/buyerNavItems.tsx
import React from "react";
import {
  FaHome,
  FaBoxOpen,
  FaMapMarkedAlt,
  FaCommentDots,
} from "react-icons/fa";
import { dashboardConfig } from "../../../lib/config";

// Define the shape of a navigation item.
export interface BuyerNavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

// Get the buyer configuration from your dashboard config.
const buyerConfig = dashboardConfig.getConfig("buyer");
const { routes } = buyerConfig;



export const buyerNavItems: BuyerNavItem[] = [
  { path: routes.home, label: "Home", icon: <FaHome size={18} /> },
  { path: routes.products, label: "Products", icon: <FaBoxOpen size={18} /> },
  {
    path: routes.trackOrder,
    label: "Track Order",
    icon: <FaMapMarkedAlt size={18} />,
  },
  {
    path: routes.notifications,
    label: "Notification",
    icon: <FaCommentDots size={18} />,
  },
];
