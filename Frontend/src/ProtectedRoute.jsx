import { Outlet, Navigate } from "react-router-dom";


const ProtectedRoute = ({ adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  // Not authenticated
  if (!token || !user) return <Navigate to="/login" replace />;

  // Authenticated but not admin — bounce to home
  if (adminOnly && user.Usertype !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;