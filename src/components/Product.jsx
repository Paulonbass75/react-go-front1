import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDB } from "./contexts/Context";

const Product = () => {
  const { partNum } = useParams();
  const { getProductByPartNumber, product } = useDB();

  useEffect(() => {
    getProductByPartNumber(partNum);
  }, []);

  return (
    <div>
      <div>
        <div className="min-h-full md:flex-row md:max-w-xl rounded-lg shadow-lg">
          <h2>Product: {product.name}</h2>
          <small>
            <em>
              {product.name}, {product.description} ${""}
              {product.part_number}
            </em>
          </small>
          <br />
          {product.categories.map((c) => (
            <span key={c.category} className="badge bg-secondary me-2">
              {c.category}
            </span>
          ))}
          <hr />

          {product.Image !== "" && (
            <div className="mb-3 mt-3">
              <img
                className=" w-full h-full md:h-auto object-contain
         md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src={
                  `http://www.autometaldirect.com/images/` +
                  product.manufacturers_id +
                  "/" +
                  product.products_image
                }
                alt="poster"
              />
            </div>
          )}

          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
