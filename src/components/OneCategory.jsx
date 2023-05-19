import React from 'react'
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function OneCategory() {
// get prop passed from Categories.jsx
const location = useLocation();
const { genreName } = location.state;

// set stateful variable for movies
const [movies, setMovies] = useState([]);

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

fetch(`/movies/genres/${id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
        if (data.error) {
            console.log(data.message);
        }else {
    setMovies(data);
        }
    })
    .catch((err) => {
        console.log(err);
    });
}, [id]);

// render movies




  return (
    <>
      <h2>Categories {genreName}</h2>
        <hr />
        {movies ? (
      <table className="table tables-triped table-hover">
        <thead>
            <tr>
                <th>Movie</th>
                <th>Release Date</th>
                <th>Rating</th>
            </tr>
        </thead>
        <tbody>
            {movies.map((m) => (
                <tr key={m.id}>
                    <td>
                        <Link to={`/movies/${m.id}`}>{m.title}</Link>
                    </td>
                    <td>{m.release_date}</td>
                    <td>{m.mpaa_rating}</td>
                </tr>
            ))}
        </tbody>
      </table>
      ):( <p>No movies found</p>
      
      )}
    </>
  );
}
