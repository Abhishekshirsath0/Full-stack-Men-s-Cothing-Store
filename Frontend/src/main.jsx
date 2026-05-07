import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PageSkeleton } from "./component/Skeleton/SkeletonLoader";

//  Lazy imports
const App = lazy(() => import("./App.jsx"));
const FilterSidebar = lazy(() => import("./component/CategoryFilter"));
const Login = lazy(() => import("./component/Login.jsx"));
const MyCart = lazy(() => import("./component/MyCart.jsx"));
const About = lazy(() => import("./component/About.jsx"));
const Contact = lazy(() => import("./component/contact.jsx"));
const Settings = lazy(() => import("./component/Account/settings.jsx"));
const Account = lazy(() => import("./component/Account/Account.jsx"));
const UserInfo = lazy(() => import("./component/Account/UserInfo.jsx"));
const OrderPage = lazy(() => import("./component/Account/Order.jsx"));
const ManageAddress = lazy(() => import("./component/Account/ManageAdd.jsx"));
const Payment = lazy(() => import("./component/Account/Payment.jsx"));

const Dashboard = lazy(() => import("./component/DashBoard/Dashboard.jsx"));
const AddProduct = lazy(() => import("./component/DashBoard/AddProduct.jsx"));
const ManageUsers = lazy(() => import("./component/DashBoard/ManageUsers.jsx"));
const ManageOrders = lazy(
  () => import("./component/DashBoard/ManageOrders.jsx"),
);
const ManageProducts = lazy(
  () => import("./component/DashBoard/ManageProducts.jsx"),
);

const Register = lazy(() => import("./component/Redister.jsx"));

const ProtectedRoute = lazy(() => import("./ProtectedRoute.jsx"));

const ViewProduct = lazy(() => import("./component/ViewProduct.jsx"));
//  Router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "home/about-us", element: <About /> },
      { path: "home/contact-us", element: <Contact /> },
      { path: "collections", element: <FilterSidebar /> },
      { path: "collections/:category", element: <FilterSidebar /> },
      { path: "view/:id", element: <ViewProduct /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      { path: "/mycart", element: <MyCart /> },
      { path: "/home/categories", element: <FilterSidebar /> },
      {
        path: "/account",
        element: <Account />,
        children: [
          { index: true, element: <UserInfo /> },
          { path: "orders", element: <OrderPage /> },
          { path: "address", element: <ManageAddress /> },
          { path: "payment", element: <Payment /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute adminOnly={true} />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: <AddProduct /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "add-product", element: <AddProduct /> },
          { path: "manage-order", element: <ManageOrders /> },
          { path: "manage-products", element: <ManageProducts /> },
          { path: "edit-product", element: <AddProduct /> },
        ],
      },
    ],
  },
]);

// Render with Suspense
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="bottom-right" />

    <Suspense fallback={<PageSkeleton />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
);