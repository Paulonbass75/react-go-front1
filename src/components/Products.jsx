import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Products() {
  const [products, setProducts] = useState([]); // state for movies

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`/products`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h2>products</h2>
      <hr />
      <Card>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Product</th>
            <th>Part Number</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((m) => (
            <tr key={m.id}>
              <td>
                <Link to={`/products/${m.id}`}>{m.title}</Link>
              </td>
              <td>{m.release_date}</td>
              <td>{m.mpaa_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </Card>
   
    </div>
  );
}
