 import React from 'react'
 import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

 export default function Card() {
  const [product, setproduct] = useState({});
  let { id } = useParams();

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`/products/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setproduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (product.categories) {
    product.categories = Object.values(product.categories);
  } else {
    product.categories = [];
  }
 

 
 
 
 
 return (
   <div>
     <div className="flex flex-col min-h-full md:flex-row md:max-w-xl rounded-lg shadow-lg">
       <h2>product: {product.title}</h2>
       <small>
         <em>
           {product.release_date}, {product.runtime} minutes, Rated{""}
           {product.mpaa_rating}
         </em>
       </small>
       <br />
       {product.categories.map((g) => (
         <span key={g.category} className="badge bg-secondary me-2">
           {g.category}
         </span>
       ))}
       <hr />

       {product.Image !== "" && (
         <div className="mb-3">
           <img
             src={`https://www.autometaldirect.com/images/6/500-3569-L-frontside.jpg${product.image}`}
             alt="img"
           />
         </div>
       )}

       <p>{product.description}</p>
     </div>
   </div>
 );
}
    