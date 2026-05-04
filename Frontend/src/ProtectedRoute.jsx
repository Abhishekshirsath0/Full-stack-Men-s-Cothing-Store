import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");

  if (!token) return <Navigate to="/login" />;

  if (adminOnly && usertype !== "admin") return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectedRoute;