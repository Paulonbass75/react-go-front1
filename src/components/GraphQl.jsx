import React from 'react'
import { useEffect, useState } from "react";
import Input from './form/Input';
import { Link } from "react-router-dom";


export default function GraphQl() {
// setup stateful variable
const [searchTerm, setSearchTerm] = useState(""); // state for search query
const [movies, setMovies] = useState([]); // state for movies
const [fullList, setFullList] = useState([]); // state for full list of movies
  

//perform search query
const performSearch = (e) => {
  const payload = `
  {
    search(titleContains: "${searchTerm}") {
      id
      title
      release_date
      mpaa_rating
      runtime
    }
  }`;
    
  const headers = new Headers();
  headers.append("Content-Type", "application/graphql");

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: payload,
  };

  fetch(`/graph`, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      let theList = Object.values(response.data.search);
      setMovies(theList);
    })
    .catch((err) => {
      console.log(err);
    }
  );


}

//handle change
const handleChange = (e) => {
  e.preventDefault()
  let value = e.target.value;
  setSearchTerm(value);

  if (value.length > 2) {
    performSearch();
  } else {
   
    setMovies(fullList);
  }
}

//useEffect to fetch data from server
useEffect(() => {
  const payload = 
  `{
    list {
      id
      title
      release_date
      mpaa_rating
      runtime
    }

  }`;
  const headers = new Headers();
  headers.append("Content-Type", "application/graphql");

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: payload,
  };
//fetch from backend @ /graph
  fetch(`/graph`, requestOptions)
    .then((response) => response.json())
    .then((response) => {
     let theList = Object.values(response.data.list);
      setMovies(theList);
      setFullList(theList);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

//return statement

return (
    <div>
    <h2>GraphQl</h2>
    <hr />
    <form onSubmit={handleChange}>
      <Input
        title={"Search"}
        type={"search"}
        name={"search"}
        className={"form-control"}
        value={searchTerm}
        onChange = {handleChange} />
    </form>
{movies ? (
  <table className="table table-striped table-hover">
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
          <td>{new Date(m.release_date).toLocaleDateString()}</td>
          <td>{m.mpaa_rating}</td>
        </tr>
      ))}
    </tbody>

  </table>
) : (
  <p>There are no movies in the database</p>
)}

    </div>
  )
}
