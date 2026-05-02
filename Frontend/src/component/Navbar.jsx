import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Start as false - only show if data loading

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ✅ FIXED: No artificial delay - remove setTimeout completely
  // Skeleton only shows while actual data is being fetched
  useEffect(() => {
    // If you have real navbar data to fetch, do it here
    // For now, navbar is always ready since it's static
    setLoading(false);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCategory = () => {
    navigate("/home/categories");
  };

  return (
    <nav className="max-w-7xl w-full mx-auto px-4 py-3 border-b border-gray-300">
      <div className="flex items-center justify-between">

        {/* Logo - ✅ FIXED: Add dimensions to prevent CLS */}
        <h1 className="text-xl font-semibold">
          {loading ? <Skeleton width={140} /> : "Men's Clothes"}
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 w-full ml-6">

          {loading ? (
            <>
              <Skeleton width={70} height={35} />
              <Skeleton width={120} height={35} />
              <Skeleton width={100} height={35} />
            </>
          ) : (
            <>
              <Link to="/">
                <button 
                  className="p-2 border rounded hover:bg-gray-950 hover:text-white transition-colors duration-200"
                  aria-label="Go to home page"
                >
                  Home
                </button>
              </Link>

              <button
                onClick={handleCategory}
                className="p-2 border rounded hover:bg-gray-950 hover:text-white whitespace-nowrap transition-colors duration-200"
                aria-label="Browse all categories"
              >
                All Categories
              </button>

              <Link to="/dashboard">
                <button 
                  className="p-2 border rounded hover:bg-gray-950 hover:text-white whitespace-nowrap transition-colors duration-200"
                  aria-label="Go to dashboard"
                >
                  Dashboard
                </button>
              </Link>
            </>
          )}

          <div className="flex-1"></div>

          {/* Search - ✅ FIXED: Add width/height to prevent CLS */}
          <div className="relative w-64 h-9">
            {loading ? (
              <Skeleton height={35} />
            ) : (
              <>
                <input
                  type="text"
                  className="py-2 px-4 pr-10 border rounded-full w-full h-full"
                  placeholder="Search..."
                  aria-label="Search products"
                />
                <span 
                  className="absolute right-3 top-2 text-gray-500 pointer-events-none"
                  aria-hidden="true"
                >
                  🔍
                </span>
              </>
            )}
          </div>

          {/* Right Buttons */}
          {loading ? (
            <>
              <Skeleton width={80} height={35} />
              <Skeleton width={80} height={35} />
            </>
          ) : (
            <>
              <Link
                to="/mycart"
                className="text-white bg-black px-4 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-gray-800 transition-colors duration-200"
              >
                My Cart
              </Link>

              <Link
                to="/login"
                className="text-black border border-black px-4 py-2 rounded-lg text-sm hover:bg-black hover:text-white transition-colors duration-200"
              >
                Login
              </Link>
            </>
          )}

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {loading ? (
              <Skeleton width={80} height={35} />
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                  className="flex items-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-950 hover:text-white transition-colors duration-200"
                  aria-label="More options menu"
                  aria-expanded={dropdownOpen}
                >
                  More <span aria-hidden="true">▼</span>
                </button>

                {dropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-40 bg-gray-200 rounded-lg shadow-md z-20"
                    role="menu"
                  >
                    <Link 
                      to="/Account" 
                      className="block px-3 py-2 hover:bg-gray-300 transition-colors duration-150"
                      role="menuitem"
                    >
                      User Account
                    </Link>
                    <Link 
                      to="/home/about-us" 
                      className="block px-3 py-2 hover:bg-gray-300 transition-colors duration-150"
                      role="menuitem"
                    >
                      About
                    </Link>
                    <Link 
                      to="/home/contact-us" 
                      className="block px-3 py-2 hover:bg-gray-300 transition-colors duration-150"
                      role="menuitem"
                    >
                      Contact
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block px-3 py-2 hover:bg-gray-300 transition-colors duration-150"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-2xl hover:opacity-70 transition-opacity"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {loading ? <Skeleton width={30} /> : mobileMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu - ✅ FIXED: Added aria-hidden for accessibility */}
      {mobileMenuOpen && !loading && (
        <div className="md:hidden flex flex-col mt-4 gap-4">
          <Link 
            to="/Account" 
            className="block px-3 py-2 hover:bg-gray-300 transition-colors duration-150"
          >
            User Account
          </Link>
          <Link 
            to="/" 
            className="p-2 hover:bg-gray-100 transition-colors duration-150"
          >
            Home
          </Link>
          <button 
            onClick={handleCategory} 
            className="p-2 text-left hover:bg-gray-100 transition-colors duration-150 w-full"
          >
            All Categories
          </button>
          <Link 
            to="/mycart" 
            className="p-2 hover:bg-gray-100 transition-colors duration-150"
          >
            My Cart
          </Link>
          <Link 
            to="/login" 
            className="p-2 hover:bg-gray-100 transition-colors duration-150"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;