import React, { useState, useEffect } from "react";
import axios from "axios";

function Produits() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      setPosts(response.data);
      setLoading(false);
    };

    loadPosts();
  }, []);

  return (
    <div className="displayProducts">
        <div className="displayItems">
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
          })
          .map((item) => <h5 key={item.id} >{item.country}.</h5>)
      )}
      </div>
    </div>
  )
}

export default Produits
