import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/graalSpotterLogo11.png";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt="logo"/>
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/Connexion"> Connexion </Link>
          <Link to="/Inscription"> Inscription </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/Connexion"> Connexion </Link>
        <Link to="/Inscription"> Inscription</Link>
      </div>
    </div>
  );
}

export default Navbar;