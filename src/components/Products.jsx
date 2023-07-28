import React, { useState, useEffect } from "react";
import axios from "axios";
import { DBProvider } from "./contexts/Context";
import Card from "./Card";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/v2/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <DBProvider>
<Card>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-3 m-4 place-content-center">
        {products.map((product, index) => (
          <div
            key={index}
            value={product.products_id}
            className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                className="rounded-t-lg w-full"
                src={`http://www.autometaldirect.com/images/${product.manufacturers_id}/${product.products_image}`}
                alt=""
              />
            </a>
            <div className="p-5">
              <a>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.products_model}
                </h5>
              </a>
            </div>
          </div>
        ))}
      </div>
</Card>
    </DBProvider>
  );
}

export default ProductList;
