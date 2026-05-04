import { Suspense, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { DashboardSkeleton, PageSkeleton } from "../Skeleton/SkeletonLoader";

const Account = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* MOBILE TOP BAR */}
      <div className="flex items-center justify-between bg-white p-4 md:hidden shadow fixed top-0 left-0 right-0 z-30">
        <h1 className="font-semibold text-lg">Account</h1>

        <button onClick={() => setSidebarOpen(true)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-60 bg-white shadow-lg p-4
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-8 mt-2">
          <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full font-bold">
            A
          </div>
          <div>
            <h2 className="font-semibold">Abhishek</h2>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>

        {/* LINKS */}
        <nav className="space-y-2">
          <Link
            onClick={handleLinkClick}
            to="/"
            className="block p-2 rounded hover:bg-gray-100"
          >
            Home
          </Link>

          <Link
            onClick={handleLinkClick}
            to="add-product"
            className="block p-2 rounded hover:bg-gray-100"
          >
            Add Product
          </Link>

          <Link
            onClick={handleLinkClick}
            to="manage-products"
            className="block p-2 rounded hover:bg-gray-100"
          >
            Manage Products
          </Link>

          <Link
            onClick={handleLinkClick}
            to="manage-users"
            className="block p-2 rounded hover:bg-gray-100"
          >
            Manage Users
          </Link>

          <Link
            onClick={handleLinkClick}
            to="manage-order"
            className="block p-2 rounded hover:bg-gray-100"
          >
            Manage Orders
          </Link>
        </nav>
      </aside>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT (FIXED SPACING) */}
      <main className="flex-1 md:ml-60 mt-16 md:mt-0 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Account;
