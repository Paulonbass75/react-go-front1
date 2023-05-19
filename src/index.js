import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import EditMovies from "./components/EditMovies";
import ErrorPage from "./components/ErrorPage";
import Categories from "./components/Categories";
import GraphQl from "./components/GraphQl";
import Home from "./components/Home";
import Login from "./components/Login";
import ManageCatalogue from "./components/ManageCatalogue";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import OneCategory from "./components/OneCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/Movies", element: <Movies /> },
      { path: "/Movies/:id", element: <Movie /> },
      { path: "/Categories", element: <Categories /> },
      { path: "/Categories/:id", element: <OneCategory /> },
      { path: "/admin/Movie/0", element: <EditMovies /> },
      { path: "/admin/Movie/:id", element: <EditMovies /> },
      { path: "/Admin", element: <ManageCatalogue /> },
      { path: "/GraphQl", element: <GraphQl /> },
      { path: "/Login", element: <Login /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
