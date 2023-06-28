import React from 'react'
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function OneCategory() {
// get prop passed from Categories.jsx
const location = useLocation();
const { categoryName } = location.state;

// set stateful variable for movies
const [categories, setCategories] = useState([]);

// get id from url
let { id } = useParams();

// use useEffect to fetch movies for this category
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
      <h2>Category {categoryName}</h2>
        <hr />
        {categories ? (
      <table className="table tables-triped table-hover">
        <thead>
            <tr>
                
            </tr>
        </thead>
        <tbody>
            {categories.map((c) => (
                <tr key={c.id}>
                    <td>
                        <Link to={`/categories/${c.id}`}>{c.name}</Link>
                    </td>
                    <td>{c.name}</td>
                    <td>{c.head_title}</td>
                </tr>
            ))}
        </tbody>
      </table>
      ):( <p>Category Not Found</p>
      
      )}
    </>
  );
}
