import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Account = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLinkClick = () => {
    
    
      setSidebarOpen(false);
    
  };

  return (
    <div className="bg-gray-100">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between bg-white p-4 md:hidden shadow">
        <h1 className="font-semibold text-lg">Account</h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-700 focus:outline-none"
        >
          {/* Hamburger Icon */}
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

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-lg p-5 transform 
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            transition-transform duration-300 ease-in-out
            md:translate-x-0 md:static md:inset-auto
          `}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full font-bold">
              A
            </div>
            <div>
              <h2 className="font-semibold">Abhishek</h2>
              <p className="text-sm text-gray-500">User</p>
            </div>
          </div>

          <nav className="space-y-3">
            <Link onClick={handleLinkClick} to="/" className="block p-2 rounded-lg hover:bg-gray-100">
              Go Home
            </Link>
            <Link onClick={handleLinkClick} to="/account" className="block p-2 rounded-lg hover:bg-gray-100">
              Account Details
            </Link>
            <Link onClick={handleLinkClick} to="orders" className="block p-2 rounded-lg hover:bg-gray-100">
              Orders
            </Link>
            <Link onClick={handleLinkClick} to="address" className="block p-2 rounded-lg hover:bg-gray-100">
              Manage Address
            </Link>
            <Link onClick={handleLinkClick} to="payment" className="block p-2 rounded-lg hover:bg-gray-100">
              Payments
            </Link>
            <Link onClick={handleLinkClick} to="settings" className="block p-2 rounded-lg hover:bg-gray-100">
              Settings
            </Link>
          </nav>
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Account;