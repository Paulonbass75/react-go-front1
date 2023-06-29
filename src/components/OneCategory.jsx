import React from 'react'
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function OneCategory() {
  // get prop passed from Categories.jsx
  const location = useLocation();
//   const { categoryName } = location.state;

  // set stateful variable for categories
  const [categories, setCategories] = useState([]);

  // get id from url
  let { id } = useParams();

  // use useEffect to fetch categories for this category
  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`http://10.0.1.244/api/v1/categories`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.message);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // render category

  return (
    <>
      {/* <h2>Category {categoryName}</h2> */}
      <hr />
      {categories ? (
        <ul className="table tables-triped table-hover">
          {categories.map((c) => (
            <li key={c.id}>
              <a href={`/c/${c.parent_id} &{c.id}`}>
                {/* <img src={c.img} alt={c.name} /> */}
                <h3 className="font-bold">
                  ${c.name} ${c.parent_name}
                </h3>
                <p>{c.head_desc}</p>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Category Not Found</p>
      )}
    </>
  );
}
