import React, { useState } from "react";
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
        </div>
      </div>
      <div className="rightSide">
      </div>
    </div>
  );
}

export default Navbar;