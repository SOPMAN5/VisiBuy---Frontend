import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import SearchBox from "../../ui/buyer/header/SearchBox";
import CartIcon from "../../ui/buyer/header/CartIcon";
import DashboardButton from "../../ui/buyer/header/DashboardButton";
import ProfilePicture from "../../ui/buyer/header/ProfilePicture";
import profilepic from "../../assets/Buyer/profilepic.jpg";
import logo from "../../assets/Buyer/logo.png";
import { dashboardConfig } from "../../lib/config";

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

// Define props for HeaderBar.
interface HeaderBarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  onMenuClick,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 640);

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Update state when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get the buyer config and compute the home URL.
  const buyerConfig = dashboardConfig.getConfig("buyer");
  const homeUrl = buildUrl(buyerConfig.basePath, buyerConfig.routes.home);

  return (
    <>
      <header className="bg-background border border-gray-100 p-8">
        <div className="flex justify-between items-center">
          {/* Left Side: Menu Icon + Logo (wrapped in a Link to buyer home) */}
          <div className="flex items-center gap-4">
            <FaBars
              className="text-xl text-blue cursor-pointer sm:hidden"
              onClick={onMenuClick} // Use the passed callback to open the sidebar
            />
            <Link to={homeUrl} className="block sm:hidden">
              <img src={logo} alt="VisiBuy" className="h-6" />
            </Link>
          </div>

          {/* Right Side: Cart, Dashboard, Profile */}
          <div className="flex items-center gap-4">
            {isLargeScreen && (
              <SearchBox
                placeholder="Search outlets/products"
                onSearch={handleSearch}
              />
            )}
            <CartIcon itemCount={3} />
            <DashboardButton />
            <ProfilePicture imageSrc={profilepic} altText="User" />
          </div>
        </div>

        {/* Search Box: Full width only on small screens */}
        {!isLargeScreen && (
          <div className="mt-4">
            <SearchBox
              placeholder="Search outlets/products"
              onSearch={handleSearch}
            />
          </div>
        )}
      </header>
      {/* Note: The MobileSideBar is rendered in BuyerDashboardLayout */}
    </>
  );
};

export default HeaderBar;
