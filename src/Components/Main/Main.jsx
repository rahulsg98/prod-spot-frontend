import React, { useEffect } from "react";
import "./Main.css";
import useProductContext from "../../context/useProductContext";
import Navbar from "./Navbar/Navbar";
import IntroSection from "./IntroSection/IntroSection";
import Footer from "./Footer/Footer";

const Main = () => {
  const { setLoggedIn } = useProductContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  });
  return (
    <div className="main-page">
      <Navbar />
      <IntroSection />
      <Footer />
    </div>
  )
}

export default Main;