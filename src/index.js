import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import EditMovies from "./components/EditProducts";
import ErrorPage from "./components/ErrorPage";
import Categories from "./components/Categories";
import GraphQl from "./components/GraphQl";
import Home from "./components/Home";
import Login from "./components/Login";
import ManageCatalogue from "./components/ManageCatalogue";
import Products from "./components/Products";
import Product from "./components/Product";
import OneCategory from "./components/OneCategory";
import Card from "./components/Card";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/Products", element: <Products /> },
      { path: "/Product/:id", element: <Product /> },
      { path: "/Categories", element: <Categories /> },
      { path: "/Categories/:id", element: <OneCategory /> },
      { path: "/admin/Products/0", element: <EditMovies /> },
      { path: "/admin/Products/:id", element: <EditMovies /> },
      { path: "/Admin", element: <ManageCatalogue /> },
      { path: "/GraphQl", element: <GraphQl /> },
      { path: "/Login", element: <Login /> },
      { path: "/Card", element: <Card /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
