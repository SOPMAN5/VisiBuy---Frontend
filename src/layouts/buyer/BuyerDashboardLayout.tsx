import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../layouts/buyer/SideBar";
import HeaderBar from "../../layouts/buyer/HeaderBar";
import MobileSideBar from "../../ui/buyer/sidebar/MobileSideBar";

const BuyerDashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen">
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
