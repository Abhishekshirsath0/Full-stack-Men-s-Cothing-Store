import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Account = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  // Close sidebar on ESC key (better UX)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeSidebar();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">

      {/* MOBILE TOP BAR */}
      <div className="flex items-center justify-between bg-white p-4 md:hidden shadow">
        <h1 className="font-semibold text-lg">Account</h1>

        <button
          onClick={openSidebar}
          aria-label="Open menu"
          className="text-gray-700"
        >
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

     

      {/* OVERLAY (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Account;