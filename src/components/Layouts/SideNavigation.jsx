import React from "react";
import { useState, useCallback, useEffect } from "react";
import logo from "../../images/store_logo.png";
import { Link, useNavigate } from "react-router-dom";
import MkYrMdl from "./MkYrMdl";
// const parentLinks = [
//   {
//     id: 1,
//     name: "Test 1",
//     children: [
//       { id: 11, name: "Child 1 Test 1" },
//       { id: 12, name: "Child 2 Test 1" },
//       { id: 13, name: "Child 3 Test 1" },
//       { id: 14, name: "Child 4 Test 1" },
//       { id: 15, name: "Child 5 Test 1" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Test 2",
//     children: [
//       { id: 22, name: "Child 1 Test 2" },
//       { id: 23, name: "Child 2 Test 2" },
//       { id: 24, name: "Child 3 Test 2" },
//       { id: 25, name: "Child 4 Test 2" },
//       { id: 26, name: "Child 5 Test 2" },
//     ],
//   },
//   {
//     id: 3,
//     name: "Test 3"},
//   {
//     id: 4,
//     name: "Test 4",
//     children: [
//       { id: 41, name: "Child 1 Test 4" },
//       { id: 42, name: "Child 2 Test 4" },
//       { id: 43, name: "Child 3 Test 4" },
//       { id: 44, name: "Child 4 Test 4" },
//       { id: 45, name: "Child 5 Test 4" },
//     ],
//   },
//   {
//     id: 5,
//     name: "Test 5",
//     children: [
//       { id: 51, name: "Child 1 Test 5" },
//       { id: 52, name: "Child 2 Test 5" },
//       { id: 53, name: "Child 3 Test 5" },
//       { id: 54, name: "Child 4 Test 5" },
//       { id: 55, name: "Child 5 Test 5" },
//     ],
//   },
//   {
//     id: 6,
//     name: "Test 6",
//     children: [
//       { id: 61, name: "Child 1 Test 6" },
//       { id: 62, name: "Child 2 Test 6" },
//       { id: 63, name: "Child 3 Test 6" },
//       { id: 64, name: "Child 4 Test 6" },
//       { id: 65, name: "Child 5 Test 6" },
//     ],
//   },
//   {
//     id: 7,
//     name: "Test 7",
//     children: [
//       { id: 71, name: "Child 1 Test 6" },
//       { id: 72, name: "Child 2 Test 6" },
//       { id: 73, name: "Child 3 Test 6" },
//       { id: 74, name: "Child 4 Test 6" },
//       { id: 75, name: "Child 5 Test 6" },
//     ],
//   },
// ];
// import Menu from "../Menus";

export default function SideNavigation() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [navHeight, setNavHeight] = useState("");

  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // state for categories
  const [error, setError] = useState(""); // state for error

  const openDropdown = (e) => {
    document.querySelector("[data-sidenav]").classList.toggle("right-0");
    document.querySelector("[data-sidenav]").classList.toggle("-right-full");
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

    setNavHeight(document.getElementById("MyNav").clientHeight);
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

  // Start of page
  return (
    <div
      className="side-menu mt-[1px] absolute h-screen max-[500px]:w-full bg-slate-800 -right-full duration-[1s] shadow-lg shadow-black top-full"
    >
      <div className="flex flex-col overflow-y-scroll duration-[1s] h-full text-white w-full relative">
        <ul className="flex w-full items-center flex-col font-semibold text-xl">
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
          <li className="w-full flex justify-center mt-5">
            <MkYrMdl />
          </li>
        </ul>

        {/* Parent Categories Menu */}
        <div
          data-sidenav
          className="flex flex-col overflow-y-scroll overflow-x-hidden duration-[1s] absolute h-full w-full bg-slate-800 -right-full bottom-0"
        >
          <div className="py-5 ps-4 border-b border-b-white text-left">
            <a href=""
              role="button"
              className="underline underline-offset-2"
              onClick={openDropdown}
            >
              <i className="bi bi-arrow-left"></i>Go Back
            </a>
          </div>

          {categories.map((c) => (
            <Link
              to={`/Categories/${c.id}`}
              key={c.name}
              state={{
                categoryName: c.name,
              }}
              className="font-poppins text-md font-normal py-4 border-b-[1px] border-white pl-2"
            >
              {c.name}
            </Link>
          ))}

          {/* Mason Test */}
          {/* {parentLinks.map((c) => (
            ((c.children != null) &&
              <a
              role="button"
              className="font-poppins text-md font-normal py-5 border-b-[1px] border-white pl-2"
              >
              {c.name}
              </a>
            )
             */}
              {/* // <Link */}
              // to="/"
              // className="font-poppins text-md font-normal py-5 border-b-[1px] border-white pl-2"
              {/* // >
              // {c.name}
              // </Link>
            
            
              ))} */}
        </div>
      </div>
    </div>
  );
}
