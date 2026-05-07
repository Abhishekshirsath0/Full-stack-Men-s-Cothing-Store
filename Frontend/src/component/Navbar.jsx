import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // ✅ FIX: fallback to localStorage if user prop is missing
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const currentUser = user || storedUser;

  // ✅ SAFE ADMIN CHECK (handles "admin", "ADMIN ", etc.)
  const isAdmin =
    currentUser?.Usertype?.toString().trim().toLowerCase() === "admin";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="max-w-7xl w-full mx-auto px-4 py-3 border-b border-gray-300">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl font-semibold">Men's Clothes</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 w-full ml-6">

          <Link to="/">
            <button className="p-2 border rounded hover:bg-gray-950 hover:text-white">
              Home
            </button>
          </Link>

          {/* ✅ DASHBOARD ONLY FOR ADMIN */}
          {isAdmin && (
            <Link to="/dashboard">
              <button className="p-2 border rounded hover:bg-gray-950 hover:text-white">
                Dashboard
              </button>
            </Link>
          )}

          <div className="flex-1"></div>

          {/* Search */}
          <div className="relative w-64 h-9">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 pr-10 border rounded-full w-full h-full"
            />
            <span className="absolute right-3 top-2 text-gray-500">
              🔍
            </span>
          </div>

          {/* Cart */}
          <Link
            to="/mycart"
            className="text-white bg-black px-4 py-2 rounded-lg text-sm"
          >
            My Cart
          </Link>

          {/* LOGIN / LOGOUT */}
          {currentUser ? (
            <button
              onClick={onLogout}
              className="text-black border border-black px-4 py-2 rounded-lg text-sm hover:bg-black hover:text-white"
            >
              Logout ({currentUser?.Firstname || "User"})
            </button>
          ) : (
            <Link
              to="/login"
              className="text-black border border-black px-4 py-2 rounded-lg text-sm hover:bg-black hover:text-white"
            >
              Login
            </Link>
          )}

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3 py-2 border rounded-lg"
            >
              More ▼
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg z-20">

                <Link to="/Account" className="block px-3 py-2 hover:bg-gray-200">
                  Account
                </Link>

                <Link to="/home/about-us" className="block px-3 py-2 hover:bg-gray-200">
                  About
                </Link>

                <Link to="/home/contact-us" className="block px-3 py-2 hover:bg-gray-200">
                  Contact
                </Link>

              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-2xl"
        >
          {mobileMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col mt-4 gap-4">

          <Link to="/">Home</Link>

          {isAdmin && <Link to="/dashboard">Dashboard</Link>}

          <Link to="/mycart">My Cart</Link>

          {currentUser ? (
            <button onClick={onLogout}>
              Logout ({currentUser?.Firstname || "User"})
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;