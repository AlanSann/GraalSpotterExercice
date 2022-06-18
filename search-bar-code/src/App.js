import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import SearchBar from "./Components/SearchBar";
import BookData from "./Data.json";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchBar placeholder="Enter a Book Name..." data={BookData} />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
