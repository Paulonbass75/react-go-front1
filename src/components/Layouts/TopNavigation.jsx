import React from 'react'
import { useState, useCallback, useEffect, useRef } from 'react';
import logo from "../../images/store_logo.png";
import { Link, useNavigate } from "react-router-dom";
import SideNavigation from './SideNavigation';
import { observer, callback } from "../../composables/observer";
// import SearchBar from '../SearchBar';

export default function TopNavigation() {

  const scrollRef = useRef(0);

  const openMobileNav = () => {
    document.querySelector(".first").classList.toggle("open");
    document.querySelector(".second").classList.toggle("open");
    document.querySelector(".third").classList.toggle("open");
    document.querySelector(".side-menu").classList.toggle("right-0");
    document.querySelector(".side-menu").classList.toggle("-right-full");
  }

  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // state for movies
  const [error, setError] = useState(""); // state for error


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

    let target = document.getElementById("App");

    observer.observe(target);

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

    fetch(`/genres`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jwtToken, toggleRefresh]);
  return (
    <>
      <nav
        className="{/*bg-gradient-to-r from-[#0f1f47] to-[#5f6984] */} object-cover w-full flex items-center flex-col fixed top-0 border-b-white border-b shadow-xl show z-20"
        id="MyNav"
      >
        <div className="w-10/12 justify-between flex flex-row h-full relative max-lg:w-full max-lg:pl-10">
          {/* <SearchBar /> */}
          {jwtToken === "" ? (
            <Link
              to="/login"
              className="text-white hover:text-stone-400 font-poppins absolute text-sm -right-20 top-1"
            >
              Login
            </Link>
          ) : (
            <button
              type="button"
              onClick={logOut}
              className="text-white hover:text-stone-300 font-poppins absolute text-sm -right-20 top-1"
            >
              Logout
            </button>
          )}
            <Link to="/">
          <div className="logo h-full w-fit flex justify-center items-center place-self-start">
            <img src={logo} alt="logo" className="m-0 h-5/6" />
          </div>
            </Link>
          <div className=" h-full flex place-self-end max-lg:hidden">
            <ul className="flex w-full items-center text-white font-medium text-md font-poppins">
              <li className="group relative flex justify-center">
                <Link
                  to="/"
                  className="hover:text-[#00cbff] duration-200 mx-5 py-2"
                >
                  {/* Home */}
                </Link>
              </li>
              <li className="group relative flex justify-center">
                <button
                  type="button"
                  className="relative hover:text-[#00cbff] duration-200 mx-5 py-2"
                >
                  Categories{" "}
                  <i className="bi bi-caret-right-fill text-sm before:content-['\F231'] group-hover:before:rotate-90 before:duration-200 before:transition-transform"></i>
                </button>
                <div className="absolute top-full opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none duration-200 z-10">
                  <ul className="flex flex-col max-h-80 overflow-y-scroll">
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        to={`/Categories/${c.id}`}
                        state={{
                          categoryName: c.category,
                        }}
                        className="bg-black bg-opacity-90 hover:bg-slate-900 hover:bg-opacity-90 text-white hover:text-[#00cbff] duration-200 py-3 px-10 border-white border group-hover:pointer-events-auto text-center"
                      >
                        {c.category}
                      </Link>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="group relative flex justify-center">
                <Link
                  to="/ShoppingCart"
                  className="relative hover:text-[#00cbff] duration-200 mx-5 py-2"
                >
                  Orders
                </Link>
              </li>
              <li className="group relative flex justify-center">
                <Link
                  to="/ContactForm"
                  className="relative hover:text-[#00cbff] duration-200 mx-5 py-2"
                >
                  Contact Us
                </Link>
              </li>
              {/* Left this here for reference on dropdown */}
              {/* <li className='group relative flex justify-center'>
                                <a className='relative hover:text-[#00cbff] duration-200 mx-5 py-2' href="/">Store <i className="bi bi-caret-right-fill text-sm before:content-['\F231'] group-hover:before:rotate-90 before:duration-200 before:transition-transform"></i></a>
                                <div className='absolute top-full opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none duration-200 z-10'>
                                    <ul className='flex flex-col'>
                                        <a href="/" className=' bg-black bg-opacity-90 hover:bg-slate-900 hover:bg-opacity-90 text-white hover:text-[#00cbff] duration-200 py-3 px-10 border-white border group-hover:pointer-events-auto text-center'>Home</a>
                                        <a href="/" className=' bg-black bg-opacity-90 hover:bg-slate-900 hover:bg-opacity-90 text-white hover:text-[#00cbff] duration-200 py-3 px-10 border-white border group-hover:pointer-events-auto text-center'>About</a>
                                        <a href="/" className=' bg-black bg-opacity-90 hover:bg-slate-900 hover:bg-opacity-90 text-white hover:text-[#00cbff] duration-200 py-3 px-10 border-white border group-hover:pointer-events-auto text-center'>Pricing</a>
                                        <a href="/" className=' bg-black bg-opacity-90 hover:bg-slate-900 hover:bg-opacity-90 text-white hover:text-[#00cbff] duration-200 py-3 px-10 border-white border group-hover:pointer-events-auto text-center'>Store</a>
                                        <a href="/" className=' bg-black bg-opacity-90 hover:bg-slate-900 hover:bg-opacity-90 text-white hover:text-[#00cbff] duration-200 py-3 px-10 border-white border group-hover:pointer-events-auto text-center'>Contact</a>
                                    </ul>
                                </div>
                            </li> */}
            </ul>
          </div>
          <div className="mobile-menu h-full flex items-center absolute lg:hidden right-10">
            <div
              onClick={openMobileNav}
              className="hamburger-btn relative h-4 w-8 cursor-pointer"
            >
              <span className="h-[3px] w-full absolute bg-white top-0 first duration-300"></span>
              <span className="h-[3px] w-full absolute bg-white top-1/2 second duration-300"></span>
              <span className="h-[3px] w-full absolute bg-white top-full third duration-300"></span>
            </div>
          </div>
        </div>
        <SideNavigation />
      </nav>
    </>
  );
}
