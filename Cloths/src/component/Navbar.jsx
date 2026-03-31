import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const navigate = useNavigate(); // For programmatic navigation

  const handleCategory = () => {
    console.log("CAT button clicked");
    setCategoryOpen(true);

    // Navigate to /home/categories
    navigate("/home/categories");
  };

  return (
    <nav className="max-w-7xl w-full mx-auto px-4 py-3 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Men's Clothes</h1>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-6 w-full ml-6">
            <Link to ="/"> < button 
            
            className="p-2 border rounded  hover:bg-gray-950 hover:text-amber-50"  
          >
            Home
          </button></Link>

          {/* Category button */}


          <Link to ="/home/categories"> < button 
         
            className="p-2 border rounded hover:bg-gray-100"
          >
            All Categories
          </button></Link>
         

          <div className="flex-1"></div>

          <div className="relative w-64">
            <input
              type="text"
              className="py-2 px-4 pr-10 border rounded-full w-full"
              placeholder="Search..."
            />
            <span className="absolute right-3 top-2 text-gray-500">🔍</span>
          </div>

          <Link to="/mycart" className="text-white bg-black px-4 py-2 rounded-lg text-sm">
            My Cart
          </Link>
          <Link to="/login" className="text-black border border-black px-4 py-2 rounded-lg text-sm hover:bg-black hover:text-white transition">
            Login
          </Link>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-100"
            >
              More ▼
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-200 rounded-lg shadow-md z-20">
                 <Link to="/Account" className="block px-3 py-2 hover:bg-gray-300">User Account</Link>
                <Link to="/home/about-us" className="block px-3 py-2 hover:bg-gray-300">About</Link>
                <Link to="/home/contact-us" className="block px-3 py-2 hover:bg-gray-300">Contact</Link>
               
                <Link to="settings" className="block px-3 py-2 hover:bg-gray-300">Settings</Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col mt-4 gap-4">
             <Link to="/Account" className="block px-3 py-2 hover:bg-gray-300">User Account</Link>
          <Link to="/" className="p-2">Home</Link>
          <Link to="/home/categories" className="p-2">All Categories</Link>
          <Link to="/mycart" className="p-2">My Cart</Link>
          <Link to="/login" className="p-2">Login</Link>

        </div>
      )}
    </nav>
  );
};

export default Navbar;