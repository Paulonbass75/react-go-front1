import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Categories() {

  const [categories, setCategories] = useState([]); // state for movies
  const [error, setError] = useState(""); // state for error

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`/genres`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
       if (data.error) {
          setError(data.message);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    });


if (error !== "") {
    return <div>Error: {error.message}</div>;
  } else  {
  return (
    <div>
      <h1>

      Categories
      </h1>
      <hr />
      <div className='list-group'>
        {categories.map((g) => (
          <Link
          key={g.id}
          className='list-group-item list-group-item-action'
          to={`/Categories/${g.id}`}
          state={{ 
            genreNmae: g.genre 
          }}
          >{g.genre}</Link>
        ))}
      </div>
      </div>
  )
}
}