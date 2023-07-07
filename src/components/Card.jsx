import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Card(props) {
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

  console.log(props.image);

  return (
    <div className="card mx-4 my-4  rounded-lg shadow-xl max-w-md min-w-[28rem] inline-block bg-stone-100">
      <h2 >Category: {props.name}</h2>
      {/* <small>
         <em>
           {product.release_date}, {product.runtime} minutes, Rated{""}
           {product.mpaa_rating}
         </em>
       </small> */}
      <br />
      {product.categories.map((c) => (
        <span key={c.category} className="badge bg-secondary me-2">
          {c.category}
        </span>
      ))}
      <hr />

      {product.Image !== "" && (
        <div className="mb-3">
          <img
            src={
              props.img != null ? props.img : "https://picsum.photos/200/300"
            }
            alt="img"
            className="object-fit w-full aspect-square"
          />
        </div>
      )}
      <div className="px-3 py-4">
        <p>{props.description}</p>
      </div>
    </div>
  );
}
