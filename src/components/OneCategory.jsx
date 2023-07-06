import React from 'react'
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function OneCategory() {
  // get prop passed from Categories.jsx
  const location = useLocation();
//   const { categoryName } = location.state;


  // set stateful variable for categories
  const [cData, setData] = useState([]);

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


    //fetch data from api by id and map using array of categories and children



    fetch(`http://10.0.1.244/api/v1/categories/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, [id]);
  return (
    <div className="container">
     
    </div>
  );
};
  
