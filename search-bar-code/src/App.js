import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import SearchBar from "./Components/SearchBar";
import BookData from "./Data.json";
import useFetch from "./Components/useFetch";

function App() {

  const { data: joke, loading, error, refetch } = useFetch(
    "https://v2.jokeapi.dev/joke/Any"
  );

  if (loading) return <h1> LOADING...</h1>;

  if (error) console.log(error);
  
  return (
    <div className="App">
      <Navbar />
      <SearchBar placeholder="Enter a Book Name..." data={BookData} />
      <h1> {joke?.setup} : {joke?.delivery} </h1>
      <button onClick={refetch}> Refetch</button>
      <Home />
      <Footer />
    </div>
  );
}

export default App;
