import { useEffect, useState } from "react";
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
          className="text-gray-700 focus:outline-none "
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