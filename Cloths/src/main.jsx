import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilterSidebar from "./component/CategoryFilter";
import Login from "./component/login.jsx";
import MyCart from "./component/MyCart.jsx";
import About from "./component/About.jsx";
import Contact from "./component/contact.jsx";
import Settings from "./component/settings.jsx";
import Account from "./component/Account.jsx";
import UserInfo from "./component/UserInfo.jsx"; // <-- import UserInfo
import OrderPage from "./component/Order.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/home/categories", element: <FilterSidebar /> },
  { path: "/mycart", element: <MyCart /> },
  { path: "/login", element: <Login /> },
  { path: "/home/about-us", element: <About /> },
  { path: "/home/contact-us", element: <Contact /> },
  { path: "/home/settings", element: <Settings /> },

  {
    path: "/account",
    element: <Account />,
    children: [
      { index: true, element: <UserInfo /> }, // <-- shows at /account
      { path: "orders", element: <OrderPage /> }, // <-- shows at /account/orders
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);