import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "./form/Input";
import Select from "./form/Select";
import TextArea from "./form/TextArea";
import CheckBox from "./form/CheckBox";
import Swal from "sweetalert2";

export default function EditMovies() {
  const navigate = useNavigate();
  const { jwtToken } = useOutletContext();

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);

 

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    description: "",
    categories: [],
    categories_array: [Array(13).fill(false)],
  });

  // get id from url
  let { id } = useParams();
  if (id === undefined) {
    id = 0;
  }

  useEffect(() => {
    if (jwtToken === "") {
      navigate("/login");
      return;
    }

    if (id === 0) {
      //adding a new movie
      setMovie({
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        description: "",
        categories: [],
        categories_array: [Array(13).fill(false)],
      });

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetch(`/categories`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          const checks = [];
          data.forEach((g) => {
            checks.push({ id: g.id, checked: false, category: g.category });
          });

          setMovie((m) => ({
            ...m,
            categories: checks,
            categories_array: [],
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //editing an existing movie
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Bearer " + jwtToken);

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetch(`/admin/movies/${id}`, requestOptions)
        .then((response) => {
          if (response.status !== 200) {
            setError("Invalid response code: " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          // fix release date
          data.movie.release_date = new Date(data.movie.release_date)
            .toISOString()
            .split("T")[0];

          const checks = [];

          data.categories.forEach((g) => {
            if (data.movie.categories_array.indexOf(g.id) !== -1) {
              checks.push({ id: g.id, checked: true, category: g.category });
            } else {
              checks.push({ id: g.id, checked: false, category: g.category });
            }
          });

          // set state
          setMovie({
            ...data.movie,
            categories: checks,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, jwtToken, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];
    let required = [
      { field: movie.title, name: "title" },
      { field: movie.release_date, name: "release_date" },
      { field: movie.runtime, name: "runtime" },
      { field: movie.description, name: "description" },
      { field: movie.mpaa_rating, name: "mpaa_rating" },
    ];

    required.forEach(function (obj) {
      if (obj.field === "") {
        errors.push(obj.name);
      }
    });

    // https://sweetalert2.github.io/v9.html for alerts

    if (movie.categories_array.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "You must select at least one category",
        icon: "error",
        confirmButtonText: "OK",
      });
      errors.push("categories");
    }

    setErrors(errors);

    if (errors.length > 0) {
      return false;
    }
    // pass validation to save changes
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + jwtToken);

    //assume adding new movie
    let method = "PUT";

    if (movie.id > 0) {
      //editing existing movie
      method = "PATCH";
    }

    const requestBody = movie; //
    // need to convert values in JSON for release date (to date)
    // and for runtime (to integer)

    requestBody.release_date = new Date(movie.release_date);
    requestBody.runtime = parseInt(movie.runtime, 10);

    let requestOptions = {
      body: JSON.stringify(requestBody),
      method: method,
      headers: headers,
      creddentials: "include",
    };

    fetch(`/admin/movies/${movie.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          navigate("/Admin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = () => (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setMovie({ ...movie, [name]: value });
  };

  const handleCheck = (e, position) => {
    console.log("handleCheck called");
    console.log("value in handleCheck:", e.target.value);
    console.log("checked is", e.target.checked);
    console.log("position is", position);

    let tmpArr = movie.categories;
    tmpArr[position].checked = e.target.checked;

    let tmpIDs = movie.categories_array;
    if (!e.target.checked) {
      tmpIDs.splice(tmpIDs.indexOf(e.target.value));
    } else {
      tmpIDs.push(parseInt(e.target.value, 10));
    }

    setMovie({ ...movie, categories_array: tmpIDs, categories: tmpArr });
  };

  const confirmDelete = () => {
    Swal.fire({
      title: "Delete?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + jwtToken);

        const requestOptions = {
          method: "DELETE",
          headers: headers,
        };

        fetch(`/admin/movies/${movie.id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.log(data.error);
            } else {
              navigate("/Admin");
            }
          })
          .catch((err) => {
            console.log(err);
          });

      }
    });
  };

  if (error !== null) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <h2>Add/Edit</h2>
        <hr />
        {/* <pre>{JSON.stringify(movie, null, 3)} </pre> */}

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={movie.id} id="id"></input>
          <Input
            title={"Title"}
            className={"form-control"}
            type={"text"}
            name={"title"}
            value={movie.title}
            onChange={handleChange("title")}
            errorDiv={hasError("title") ? "text-danger" : "d-none"}
            errorMsg={"Title required"}
          />
          <Input
            title={"Release Date"}
            className={"form-control"}
            type={"date"}
            name={"release_date"}
            value={movie.release_date}
            onChange={handleChange("release_date")}
            errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
            errorMsg={"Release Date required"}
          />
          <Input
            title={"Runtime"}
            className={"form-control"}
            type={"text"}
            name={"runtime"}
            value={movie.runtime}
            onChange={handleChange("runtime")}
            errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
            errorMsg={"Runtime required"}
          />

          
          <TextArea
            title={"Description"}
            rows={"3"}
            name={"description"}
            value={movie.description}
            onChange={handleChange("description")}
            errorDiv={hasError("description") ? "text-danger" : "d-none"}
            errorMsg={"Description required"}
          />

          <hr />

          <h3>categories</h3>

          {movie.categories && movie.categories.length > 1 && (
            <>
              {Array.from(movie.categories).map((g, index) => (
                <CheckBox
                  title={g.category}
                  name={"category"}
                  key={index}
                  id={"category-" + index}
                  onChange={(e) => handleCheck(e, index)}
                  value={g.id}
                  checked={movie.categories[index].checked}
                />
              ))}
            </>
          )}

          <hr />

          <button className="btn btn-primary">Save</button>

          {movie.id > 0 && (
            <a
              href="#!"
              className="btn btn-danger ms-3"
              onClick={confirmDelete}
            >
              Delete
            </a>
          )}
        </form>
      </div>
    );
  }
}
