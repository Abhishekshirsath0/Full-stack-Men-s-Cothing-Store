import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilterSidebar from "./component/CategoryFilter";
import Login from "./component/Login.jsx";
import MyCart from "./component/MyCart.jsx";
import About from "./component/About.jsx";
import Contact from "./component/contact.jsx";
import Settings from "./component/Account/settings.jsx";
import Account from "./component/Account/Account.jsx";
import UserInfo from "./component/Account/UserInfo.jsx"; // <-- import UserInfo
import OrderPage from "./component/Account/Order.jsx";
import ManageAddress from "./component/Account/ManageAdd.jsx";
import Payment from "./component/Account/Payment.jsx";
import Dashboard from "./component/DashBoard/Dashboard.jsx";
import AddProduct from "./component/DashBoard/AddProduct.jsx";
import ManageUsers from "./component/DashBoard/ManageUsers.jsx";
import ManageOrders from "./component/DashBoard/ManageOrders.jsx";
import Register from "./component/Redister.jsx";
import ManageProducts from "./component/DashBoard/ManageProducts.jsx";
import { Toaster } from "react-hot-toast";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/home/categories", element: <FilterSidebar /> },
  { path: "/mycart", element: <MyCart /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home/about-us", element: <About /> },
  { path: "/home/contact-us", element: <Contact /> },
  { path: "settings", element: <Settings /> },

  {
    path: "/account",
    element: <Account />,
    children: [
      { index: true, element: <UserInfo /> }, // <-- shows at /account
      { path: "orders", element: <OrderPage /> }, // <-- shows at /account/orders
      { path: "address", element: <ManageAddress /> },
      { path: "payment", element: <Payment /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <AddProduct /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "manage-order", element: <ManageOrders /> },
      { path: "manage-products", element: <ManageProducts /> },
      { path: "/dashboard/edit-product", element: <AddProduct /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          zIndex: 9999,
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>,
);
