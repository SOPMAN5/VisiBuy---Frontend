import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { RxCross2 } from "react-icons/rx";
import { FaSignOutAlt } from "react-icons/fa";
import { dashboardConfig } from "../../../lib/config";
import { buyerNavItems } from "../../../modules/Buyer/components/BuyerNavItems";
import { useNotifications } from "@/context/notifications/NotificationsContext";

// Helper function to build a proper URL from the basePath and the relative path.
function buildUrl(basePath: string, path: string) {
  if (!basePath.endsWith("/")) {
    basePath += "/";
  }
  if (path.startsWith("/")) {
    path = path.slice(1);
  }
  return `${basePath}${path}`;
}

interface MobileSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSideBar: React.FC<MobileSideBarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const buyerConfig = dashboardConfig.getConfig("buyer");
  const { basePath } = buyerConfig;

  // ✅ Get the unread notifications count
  const { unreadCount } = useNotifications();

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:hidden`}
    >
      <div className="bg-white w-72 h-full flex flex-col p-6">
        {/* Close Button */}
        <button className="self-end" onClick={onClose}>
          <RxCross2 size={24} className="text-blue" />
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-6 mt-6">
          {buyerNavItems.map((item) => {
            const url = buildUrl(basePath, item.path);
            const isActive = location.pathname === url;

            return (
              <Link
                key={item.label}
                to={url}
                onClick={onClose} // Close sidebar when link is clicked
                className={clsx(
                  "flex items-center text-2xl gap-8 px-3 py-6 rounded-sm font-OpenSans transition-colors",
                  isActive ? "text-blue font-bold" : "text-black font-semibold",
                  "hover:bg-blue-200 hover:text-blue hover:font-bold"
                )}
              >
                {/* If this is the Notification item, wrap in a transparent button */}
                {item.label === "Notification" ? (
                  <button className="relative bg-transparent flex items-center p-0">
                    {React.isValidElement(item.icon)
                      ? React.cloneElement(
                          item.icon as React.ReactElement<any>,
                          { className: "text-current" }
                        )
                      : item.icon}

                    {/* Unread Count Badge */}
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2 transform translate-x-1/2 -translate-y-1/2">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ) : (
                  // Normal icon for other items
                  <>
                    {React.isValidElement(item.icon)
                      ? React.cloneElement(
                          item.icon as React.ReactElement<any>,
                          { className: "text-current" }
                        )
                      : item.icon}
                  </>
                )}

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-auto">
          <button
            onClick={onClose}
            className="flex items-center gap-4 font-OpenSans text-2xl text-red-500 font-bold"
          >
            <FaSignOutAlt size={20} /> <span>LogOut</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;
