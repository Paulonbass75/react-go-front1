import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import EditProducts from "./components/EditProducts";
import ErrorPage from "./components/ErrorPage";
import Categories from "./components/Categories";
// import GraphQl from "./components/GraphQl";
import Home from "./components/Home";
import Login from "./components/Login";
import ManageCatalogue from "./components/ManageCatalogue";
import Products from "./components/Products";
import Product from "./components/Product";
import OneCategory from "./components/OneCategory";
import Card from "./components/Card";
import SignUp from "./components/SignUp";
import ContactForm from "./components/ContactForm.jsx";
import AllProducts from "./components/AllProducts";
import ShoppingCart from "./components/ShoppingCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/Products/:id", element: <Products />, title: "Products" },
      { path: "/Product/:id", element: <Product /> },
      { path: "/AllProducts", element: <AllProducts /> },
      { path: "/Categories", element: <Categories />, title: "Categories" },
      { path: "/Categories/:id", element: <OneCategory /> },
      { path: "/admin/Products/0", element: <EditProducts /> },
      { path: "/admin/Products/:id", element: <EditProducts /> },
      { path: "/Admin", element: <ManageCatalogue /> },
      // { path: "/GraphQl", element: <GraphQl /> },
      { path: "/Login", element: <Login /> },
      { path: "/Card", element: <Card /> },
      { path: "/SignUp", element: <SignUp /> },
      { path: "/ContactForm", element: <ContactForm /> },
      { path: "/ShoppingCart", element: <ShoppingCart 
      /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
