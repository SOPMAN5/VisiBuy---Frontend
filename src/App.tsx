import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Provider} from 'react-redux';
import { store } from '@/store/store'
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
import {  SignUpPage } from "./pages/SignUpPage";
import { PassowordRestPage } from "./pages/PasswordResetPage";

// Using createHashRouter with Hash-based routing is better for GitHub Pages because:
// - GitHub Pages serves static files and does not support server-side routing, meaning traditional routing (createBrowserRouter) would result in 404 errors when refreshing or navigating directly to non-root URLs.
// - Hash-based routing (e.g., https://yourdomain.com/#/about) keeps the routing logic entirely on the client side, bypassing server involvement.
// - It ensures your app works seamlessly across all routes without needing server configuration, making it ideal for static hosting like GitHub Pages.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});
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
]); 

function App() {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      
    </QueryClientProvider></Provider>
  );
}

export default App;
