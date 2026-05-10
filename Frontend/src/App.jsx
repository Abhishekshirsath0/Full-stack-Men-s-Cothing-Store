import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Carousel from "./component/Carousel";
import Card from "./component/HeroCards";

const HIDE_HERO_ROUTES = ["/login", "/register", "/dashboard", "/view"];
const HIDE_FOOTER_ROUTES = ["/view"];

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  //  load user from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  //  LOGIN
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // LOGOUT (FIXED)
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const hideHero = HIDE_HERO_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );

  const hideFooter = HIDE_FOOTER_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {/* NAVBAR MUST RECEIVE USER */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* HERO SECTION ONLY ON HOME */}
      {!hideHero && (
        <>
          <Carousel />
          <Card />
        </>
      )}

      {/* ROUTES */}
      <Outlet context={{ user, onLogin: handleLogin }} />

      {/* FOOTER */}
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
