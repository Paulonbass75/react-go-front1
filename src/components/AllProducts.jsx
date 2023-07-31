import React, { useState } from "react";
import { useDB } from "./contexts/Context";

let pageNumber = 1;
export default function AllProducts() {
  const { products, getProductsByPageNumber } =
    useDB();
  const [disabled, setDisabled] = useState(true);
  const prevPage = () => {
    pageNumber = pageNumber - 1;
    getProductsByPageNumber(pageNumber);
  };
  const nextPage = () => {
    pageNumber = pageNumber + 1;
    getProductsByPageNumber(pageNumber);
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-row justify-center flex-wrap w-fit">
          {products.map((product, index) => {
            const price = product.product_price.slice(
              0,
              product.product_price.length - 2
            );
            return (
              <div
                key={product.id}
                id={product.id}
                className="grid grid-rows-1 mx-6 my-4 w-full rounded-lg shadow-xl max-w-[300px] bg-white"
              >
                <img
                  className="card-img-top object-contain w-full rounded-t-lg aspect-[200X300]"
                  src={`https://www.autometaldirect.com/images/6/${product.product_image}`}
                  alt={product.product_name}
                />
                <div>
                  <h3 className="text-lg font-medium">
                    {product.product_name}
                  </h3>
                  <span>${price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="w-full flex justify-between">
            {(pageNumber != 1) ? (
          <button className="underline text-blue-700 text-lg" onClick={prevPage}>Prev</button>
            ) : 
            (
                <button className="text-blue-700 opacity-75 text-lg"  onClick={prevPage} disabled>Prev</button>
                  ) 
            }
          <button className="underline text-blue-700 text-lg" onClick={nextPage}>Next</button>
        </div>
      </div>
    </>
  );
}
