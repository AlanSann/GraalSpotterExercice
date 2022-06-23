import React, { useState, useEffect } from "react";
import axios from "axios";

function Produits() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/sneakers/");
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
                value.name.toLowerCase().includes(searchTitle.toLowerCase())
              ) {
                return value;
              }
            })
            .map((item) => (
              <div className="displayItem" key={item.id}>
                <h5 className="titleSneakers" >Name :{item.name} | Brand : {item.creator} | Price : {item.price}€</h5>
                <img className="sneakersDB" src={item.image} alt="" />
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Produits;
