/* import React from "react";
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
      <Home />
      <Footer />
    </div>
  );
}

export default App; */

import React, { useState, useEffect } from "react";
import "./App.css";
import PostForm from "./Components/PostForm";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Produits from "./Components/Produits";

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/search/"
      );
      setPosts(response.data);
      setLoading(false);
    };

    loadPosts();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/Connexion" exact component={Connexion} />
          <Route path="/Inscription" exact component={Inscription} />
        </Routes>
      </Router>
      <Home />
      <PostForm />
      <Produits />
      <h3>Search Filter</h3>
      <input
        style={{ width: "30%", height: "25px" }}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      {loading ? (
        <h4>Loading ...</h4>
      ) : (
        posts
          .filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.country.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
            return false
          })
          .map((item) =>( 
            <div className="card" key={item.id}>
              <h5>Name : {item.name} | Brand : {item.creator} | Price : {item.price}€</h5>
              <img className="imgSneakers" src={item.image} alt=""/>
            </div>
          ))
      )}
      <Footer />
    </div>
  );
}

export default App;

/* function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000?q=${query}`);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);

  return (
    <div className="app">
        <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      {<Table data={data} />}
    </div>
  );
}

export default App; */
