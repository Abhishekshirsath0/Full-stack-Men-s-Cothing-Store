import { useState } from "react";
import logo from "/logo.avif";
import Carousel from "./component/Carousel";
import Navbar from "./component/navbar";
import Login from "./component/login";
import About from "./component/About";
import Footer from "./component/Footer";
import Card from "./component/HeroCards";
import Contact from "./component/contact";
import MyCart from "./component/MyCart";
import { Outlet } from "react-router";


function App() {
  return (
    <>

    
      <header >
        <Navbar></Navbar>
      </header>

      <main>
        <Carousel />
        <Card />
        <Outlet/>
      </main>
      <Footer />
     
 
    </>
  );
}

export default App;
