import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../layouts/buyer/SideBar";
import HeaderBar from "../../layouts/buyer/HeaderBar";
import MobileSideBar from "../../ui/buyer/sidebar/MobileSideBar";
import LoadingSpinner from "@/ui/LoadingSpinner";

const BuyerDashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const location = useLocation(); // Detects route changes

  useEffect(() => {
    // Show spinner on route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500); // Simulated loading delay
    return () => clearTimeout(timer);
  }, [location.pathname]); // Runs when route changes

  return (
    <div className="flex h-screen relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <LoadingSpinner isLoading={loading} size="large" />
        </div>
      )}

      <SideBar />

      <div className="flex flex-col flex-1">
        <HeaderBar
          onMenuClick={() => setIsMobileOpen(true)}
          isSidebarOpen={isMobileOpen}
          setIsSidebarOpen={setIsMobileOpen}
        />
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      <MobileSideBar
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </div>
  );
};

export default BuyerDashboardLayout;
