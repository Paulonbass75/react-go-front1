import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDB } from "./contexts/Context";
import CategoryCards from "./CategoryCards";
import Card from "./Card";

export default function OneCategory() {
  const { childCategories, getChildCategories } = useDB();

  // get id from url
  let { id } = useParams();

  // use useEffect to fetch categories for this category
  useEffect(() => {
    getChildCategories(id);
  }, []);
  //fetch data from api by id and map using array of categories and children

  return (
    //return mapped data from api and display in card
    <div className="">
      <div className="py-20 w-full mx-auto bg-white shadow-xl px-20">
        <div className="flex-row justify-evenly flex-wrap w-full">
          {/* <Link to={`/products/`}>
            {childCategories.map((cData) => (
              <Card
                key={cData.id}
                id={cData.id}
                name={cData.name}
                description={cData.head_desc}
                image={cData.img}
                price={cData.price}
              />
            ))}
          </Link> */}
          <div className="flex justify-center">
            <div className="flex flex-row justify-center flex-wrap w-fit">
              {childCategories.map((category, index) => {
                return (
                  <Link key={category.id} to={`/Products`}>
                    <CategoryCards
                      id={category.id}
                      img={category.img}
                      name={category.name}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
