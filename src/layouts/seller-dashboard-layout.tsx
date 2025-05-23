import logo from "/visibuy-beta.svg";
import { SideBar } from "@/common/components/side-bar";
import { Header } from "./header";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/ui/Button";
import { Plus } from "lucide-react";
import { NavItem } from "@/modules/Seller/components/navbar-item";
import { NavItemProps } from "@/types/navItem";
import { UserProfileCard } from "@/common/components/user-profile-card";
import { Notification } from "@/common/components/notification";
import { SearchBar } from "@/common/components/search-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createQueryString } from "@/lib/utils";
import { useGetMeQuery } from "@/modules/Auth/queries/queries";
import { useAppDispatch, useAppSelector } from "@/hooks/app-hooks";
import { RootState } from "@/store/store";
import { Role } from "@/modules/Auth/models/types";
import {
  initialAuthState,
  logout,
  setCredentials,
} from "@/modules/Auth/features/slices";
import { Toaster } from "@/ui/Toaster";
import { dashboardConfig } from "@/lib/config";
import { AddProductModal } from "@/modules/Seller/features/product/components/modals/add-product-modal";
import { FaHamburger } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { SellerMobileSideBar } from "./seller-mobile-sidebar";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const navlinks: NavItemProps[] = [
  { name: "Products", href: "products", iconName: "briefcase" },
  {
    name: "Order Details",
    href: "orders",
    iconName: "file-spreadsheet",
  },
  // { name: "Customers", href: "customers", iconName: "user-round" },
];
export function SellerDashboardLayout() {
  const auth = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, data } = useGetMeQuery(auth.role as Role);
  const [searchParams, setSearchParams] = useSearchParams();
  const isLargeScreen = useMediaQuery(1024);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  useEffect(() => {
    console.log(data);
    dispatch(
      setCredentials({
        user: data,
      })
    );
  }, [data]);
  const sellerLinks = useMemo(() => {
    return {
      helpSupport: dashboardConfig.getFullPath("seller", "helpSupport"),
      feedback: dashboardConfig.getFullPath("seller", "feedback"),
    };
  }, []);
  const handleAddProduct = useCallback(
    function () {
      const queryStrings = createQueryString(
        "modal",
        "add-product",
        searchParams.toString()
      );
      setSearchParams(queryStrings);
    },
    [searchParams]
  );
  const handleLogout = () => {
    localStorage.removeItem('redirectPath');
    dispatch(logout());
    navigate("/login");
  };
  return (
    <section className="flex min-h-screen relative">
      {/* Hidden on Mobile */}
      <div className="hidden lg:block  lg:w-[30%]  xl:w-[20%]">
        <SideBar>
          <div className="w-full px-12 mt-40">
            <Button
              size="lg"
              onClick={handleAddProduct}
              className="min-w-full font-regular text-2xl justify-evenly bg-blue border-none hover:bg-blue hover:text-white"
            >
              <Plus></Plus> Add new product
            </Button>
          </div>
          <div className="flex flex-col items-end text-left pt-12 w-full ">
            {navlinks.map(({ name, href, iconName }) => (
              <NavItem
                key={name}
                name={name}
                href={`/dashboard/seller/${href}`}
                iconName={iconName}
              />
            ))}
          </div>
          <div className="w-full px-12 my-48">
            <div className="rounded-xl bg-blue-200 p-12 w-full">
              <Link
                to={sellerLinks.feedback}
                className="text-blue flex items-center text-3xl font-OpenSans font-semibold gap-4"
              >
                <img src="/feedback.svg" width={30} alt="feedback " />{" "}
                <h3>Feedback</h3>
              </Link>
              <Link
                to={sellerLinks.helpSupport}
                className="text-blue flex items-center text-3xl font-OpenSans font-semibold gap-8 my-6"
              >
                <img src="/call-support.svg" width={20} alt="support" />{" "}
                <h3>Help & Support</h3>
              </Link>
              <Link
                to=""
                onClick={handleLogout}
                className="text-blue flex items-center text-3xl font-OpenSans font-semibold gap-7"
              >
                <img src="/Logout.svg" width={25} alt="logout" />{" "}
                <h3>LogOut</h3>
              </Link>
            </div>
          </div>
        </SideBar>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[80%]">
        <Header>
          {isLargeScreen && (
            <div className="flex justify-between">
              <SearchBar />
              <div className="flex gap-4">
                <Notification />
                <UserProfileCard fullName={data?.fullName} />
              </div>
            </div>
          )}
          {!isLargeScreen && (
            <>
              <div className="flex justify-between items-center">
                <div className="flex gap-x-8 my-6">
                  <FaBars
                    className="text-4xl text-black font-normal cursor-pointer "
                    onClick={() => setIsMobileOpen(true)}
                  />
                  <img src={logo} alt="visibuy logo" width={120} />
                </div>
                <div className="flex  gap-4">
                  <Notification />
                  <UserProfileCard fullName={data?.fullName} />
                </div>
              </div>
              <SearchBar />
            </>
          )}
        </Header>
        <main className="m-8 main content">
          <Outlet />
          <Toaster />
          <AddProductModal />
        </main>
      </div>
      <SellerMobileSideBar
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </section>
  );
}
