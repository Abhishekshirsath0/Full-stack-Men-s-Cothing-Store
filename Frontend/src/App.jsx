import Carousel from "./component/Carousel";
import Navbar from "./component/Navbar";

import Footer from "./component/Footer";
import Card from "./component/HeroCards";
import { Toaster } from "react-hot-toast";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <Toaster position="bottom-right" />
      <header>
        <Navbar></Navbar>
      </header>

      <main>
        <Carousel />
        <Card />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
