import React from "react";

//component
import Navbar from "../components/Navbar/navbar.component";
import HeroCarousal from "../components/HeroCarousal/HeroCarousal.component.js";
const DefaultLayout = (props) => {
  return (
    <>
    <Navbar/>
    <HeroCarousal/>
    {props.children}
    </>
  );
};

export default DefaultLayout;
