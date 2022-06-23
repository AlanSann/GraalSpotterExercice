import React, { useState } from "react";
import axios from "axios";

function PostForm(props) {
    const url = "http://localhost:8000/sneakers/"
    const [data, setData] = useState ({
        name: "",
        creator: "",
        image: "",
        price: "",

    })

    function submit(e){
        e.preventDefault();
        axios.post(url, {
            name: data.name,
            creator: data.creator,
            image: data.image,
            price: data.price,
        })
        .then(res=> {
            console.log(res.data)
            setData({
                name: "",
                creator: "",
                image: "",
                price: "",
            })
            //refresh the page
            window.location.reload()
        })

    }


    function handle(e) {
        const newData={...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
        
    }
    return (
        <div>
            <form onSubmit={(e) => submit(e)} >
                <input onChange={(e) => handle(e)} id="name" value={data.name} placeholder="name" type="text"></input>
                <input onChange={(e) => handle(e)} id="creator" value={data.creator} placeholder="creator" type="text"></input>
                <input onChange={(e) => handle(e)} id="image" value={data.image} placeholder="image" type="text"></input>
                <input onChange={(e) => handle(e)} id="price" value={data.price} placeholder="price" type="number"></input>
                <button>Submit</button>
            </form>
            
        </div>
    );
}

export default PostForm;

/*                 <iunput placeholder="id" type="number"></iunput>
                <iunput placeholder="name" type="text"></iunput>
                <iunput placeholder="price" type="number"></iunput>
                <iunput placeholder="creator" type="text"></iunput>
                <iunput placeholder="image" type="src"></iunput> */
