import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import TOS from "./pages/TOS";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AppLayout from "./ui/AppLayout";
import { LoginPage } from "./pages/Login";
import { SignUpPage } from "./pages/SignUpPage";
import { PassowordRestPage } from "./pages/PasswordResetPage";
import { SellerDashboardLayout } from "./layouts/seller-dashboard-layout";
import { SellerProductPage } from "./pages/Seller/Product";
import { FeedbackPage } from "./pages/Seller/Feedback";
import {  SellerOrderPage } from "./pages/Seller/Order";
import {  SellerOrderDetailsPage } from "./pages/Seller/OrderDetails";
const router = createHashRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />, // This will show when no routes match or an error occurs
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/tos",
        element: <TOS />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        // Catch-all route for undefined paths (404)
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/reset-password", element: <PassowordRestPage /> },
  {
    path: "/dashboard/seller",
    element: <SellerDashboardLayout />,
    children: [
      { path: "products", element: <SellerProductPage /> },
      { path: "order-details", element: <div>test</div> },
      { path: "feedback", element: <FeedbackPage /> },
      {
        path: "orders",
        element: <SellerOrderPage />,
        children: [{ path: "view/:orderId", element: <SellerOrderDetailsPage /> }],
      },
    ],
  },
]);

export default router;
