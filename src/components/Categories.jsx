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

    fetch(`http://10.0.1.244/api/v2/categories`, requestOptions)
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
        {categories.map((c) => (
          <Link
          key={c.id}
          className='list-group-item list-group-item-action'
          to={`/Categories/${c.id}`}
          state={{ 
            categoryName: c.category 
          }}
          >{c.category}</Link>
        ))}
      </div>
      </div>
  )
}
}


// from filter


// const catSel = (catId) => {
//     if (!data.selModel) {
//       data.selMake = null;
//       data.selYear = null;
//       axios
//         .get("http://10.0.1.244/api/v2/categories/" + catId)
//         .then((response) => {
//           data.categories = response.data.categories;
//           data.products = response.data.products;
//         });
//     }
//     if (data.selModel) {
//       axios
//         .get(
//           "/api/v2/categories/" +
//             catId +
//             "?year=" +
//             data.selYear +
//             "&make=" +
//             data.selMake +
//             "&model=" +
//             data.selModel
//         )
//         .then((response) => {
//           data.categories = response.data.categories;
//           data.products = response.data.products;
//         });
//       console.log(catId);
//     }
//   };