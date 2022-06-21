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
import axios from "axios";

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
              value.name.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item) => <h5 key={item.id}>{item.name}</h5>)
      )}
    </div>
  );
}

export default App;
