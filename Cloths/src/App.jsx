
import Carousel from "./component/Carousel";
import Navbar from "./component/Navbar";

import Footer from "./component/Footer";
import Card from "./component/HeroCards";

import { Outlet } from "react-router";

function App() {
  return (
    <>
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
