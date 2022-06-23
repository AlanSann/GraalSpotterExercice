import React from "react";
import "../styles/Home.css";
import sneakersImage from "../assets/SBDunkLowTravisScott.webp";

function Home() {
  return (
    <div className="home">
      <div className="headerContainer">
        <div className="shoeImage">
        <img src={sneakersImage} alt="sneakersImage"/>
        </div>
        <h1> Graal Spotter 2.0</h1>
        <p> A sneaker for every foot </p>
      </div>
    </div>
  );
}

export default Home;