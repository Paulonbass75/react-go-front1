import React from "react";
import { useState, useCallback, useEffect } from "react";
import logo from "../../images/store_logo.png";
import { Link, useNavigate } from "react-router-dom";
// import Menu from "../Menus";

export default function SideNavigation() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // state for movies
  const [error, setError] = useState(""); // state for error

  const openDropdown = (e) => {
    e.target.parentElement.children[1].classList.toggle("scale-y-0");
    e.target.parentElement.children[1].classList.toggle("scale-y-100");
  };

  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    fetch(`/logout`, requestOptions)
      .catch((err) => {
        console.log("logged out", err);
      })
      .finally(() => {
        setJwtToken("");
        toggleRefresh(false);
      });
    navigate("/login");
  };

  const toggleRefresh = useCallback(
    (status) => {
      console.log("clicked");

      if (status) {
        console.log("turn on ticking");
        let i = setInterval(() => {
          const requestOptions = {
            method: "GET",
            credentials: "include",
          };
          fetch(`/refresh`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setJwtToken(data.access_token);
              }
            })
            .catch((error) => {
              console.log("user not logged in");
            });
        }, 600000);
        setTickInterval(i);
        console.log("tickInterval", i);
      } else {
        console.log("turn off ticking");
        console.log("turn off tickInterval", tickInterval);
        setTickInterval(null);
        clearInterval(tickInterval);
      }
    },
    [tickInterval]
  );

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      fetch(`/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch((error) => {
          console.log("user not logged in", error);
        });
    }
    //Gets genres for dropdown menu
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`http://10.0.1.244/api/v2/categories`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setCategories(data);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jwtToken, toggleRefresh]);
  return (
    <div className="side-menu fixed h-screen w-[250px] bg-slate-800 top-[81px] -right-full duration-500 shadow-lg shadow-black">
      <ul className="flex w-full items-center flex-col text-white font-semibold text-xl">
        <li className="w-full flex">
          <Link
            to="/"
            className="py-5 border-b border-b-white w-full text-center"
          >
            Home
          </Link>
        </li>
        <li className="w-full flex flex-col">
          <button
            type="button"
            className="py-5 border-b border-b-white w-full text-center"
            onClick={openDropdown}
          >
            Categories
          </button>
          <div className="flex flex-col max-h-[200px] h-auto overflow-y-scroll scale-y-0 duration-200 origin-top">
            {categories.map((c) => (
              <Link
                to={`/Categories/${c.id}`}
                key={c.name}
                state={{
                  categoryName: c.name,
                }}
                className="font-poppins text-md font-normal py-2 border-b-[1px] border-white pl-2"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </li>
        <li className="w-full flex">
          <Link
            to="/ShoppingCart"
            className="py-5 border-b border-t border-b-white w-full text-center"
          >
            Orders
          </Link>
        </li>
        <li className="w-full flex">
          <Link
            to="/ContactForm"
            className="py-5 border-b border-t border-b-white w-full text-center"
          >
            Contact Us
          </Link>
        </li>
        <li className="w-full flex justify-center mt-5">
          {jwtToken === "" ? (
            <Link
              to="/login"
              className="text-white hover:text-stone-400 font-poppins"
            >
              Login
            </Link>
          ) : (
            <button
              type="button"
              onClick={logOut}
              className="text-white hover:text-stone-400 font-poppins"
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
