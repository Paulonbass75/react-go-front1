import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Card from "./Card";

export default function OneCategory() {
  // get prop passed from Categories.jsx
  // const location = useLocation();
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
    fetch(`http://10.0.1.244/api/v2/categories/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        console.log(data.categories);
      })
      .catch((error) => {
        console.log("error", error);
        alert(error);
        window.location.reload();
        return;
      });
  }, [id]);

  //fetch data from api by id and map using array of categories and children

  return (
    //return mapped data from api and display in card
    <div className="">
      <div className="py-20 w-full mx-auto bg-white shadow-xl px-20">
        <div className="flex-row justify-evenly flex-wrap w-full">
          <Link to={`/products/${id}`}>

          {categories.map((cData) => (
              <Card
                key={cData.id}
                id={cData.id}
                name={cData.name}
                description={cData.head_desc}
                image={cData.img}
                price={cData.price}
              />
          ))}
          </Link>
        </div>
      </div>
    </div>
  );
}
