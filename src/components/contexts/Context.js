import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

//Context set up to call database records throughout app
const DBContext = createContext();

export const useDB = () => {
  return useContext(DBContext);
};

export const DBProvider = ({ children }) => {
  const [selYears, setSelYears] = useState([]);
  const [selMakes, setSelMakes] = useState([]);
  const [selModels, setSelModels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  // Sets years and makes on page load or empty selects. ONLY ON PAGE LOAD
  const setSelectYearsAndMakes = async () => {
    try {
      return await axios.get("http://10.0.1.244/api/v2/filter");
    } catch (err) {
      return console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      return await axios.get("http://10.0.1.244/api/v2/categories");
    } catch (err) {
      return console.log(err);
    }
  };

  const getChildCategories = async (categoryId) => {
    try {
      const result = await axios.get(
        `http://10.0.1.244/api/v2/categories/${categoryId}`
      );
      const categoriesResult = result.data.categories;
      setChildCategories([]);
      categoriesResult.forEach((category) => {
        setChildCategories((childCategories) => [...childCategories, category]);
      });
    } catch (err) {
      return console.log(err);
    }
  };
  //Sets makes by year selected, changes make options everytime year is selected.
  const filterByYear = async (selYear) => {
    try {
      const result = await axios.get(
        `http://10.0.1.244/api/v2/filter?year=${selYear}`
      );
      const makes = result.data.makes;
      setSelMakes([]);
      makes.forEach((make) => {
        setSelMakes((selMakes) => [...selMakes, make]);
      });
    } catch (err) {
      return console.log(err);
    }
  };

  const filterByMake = async (selYear, selMake) => {
    try {
      const result = await axios.get(
        `http://10.0.1.244/api/v2/filter?year=${selYear}&make=${selMake}`
      );
      const models = result.data.models;
      setSelModels([]);
      models.forEach((model) => {
        setSelModels((selModels) => [...selModels, model]);
      });
    } catch (err) {
      return console.log(err);
    }
  };

  const getCategoriesByModel = async (selYear, selMake, selModel) => {
    try {
      const result = await axios.get(
        `http://10.0.1.244/api/v2/categories?model=${selModel}&year=${selYear}&make=${selMake}`
      );
      const allCategories = result.data;
      setCategories([]);
      allCategories.forEach((category) => {
        setCategories((categories) => [...categories, category]);
      });
    } catch (err) {
      return console.log(err);
    }
  };

  const getFilteredProducts = async (
    categoryId,
    selYear,
    selMake,
    selModel
  ) => {
    try {
      const result = await axios.get(
        `http://10.0.1.244/api/v2/categories/${categoryId}?model=${selModel}&year=${selYear}&make=${selMake}`
      );
      console.log(result);
      const products = result.data;
      setFilteredProducts([]);
      products.forEach((category) => {
        setFilteredProducts((filteredProducts) => [
          ...filteredProducts,
          category,
        ]);
      });
    } catch (err) {
      return console.log(err);
    }
  };

  const getProducts = async (categoryId, selYear, selMake, selModel) => {
    try {
      const result = await axios.get(`http://10.0.1.244/api/v2/products`);
      return result;
    } catch (err) {
      return console.log(err);
    }
  };

  const getProductsByPageNumber = async (pageNumber) => {
    try {
      const result = await axios.get(
        `http://10.0.1.244/api/v2/products?page=${pageNumber}`
      );
      const productResult = result.data.products;
      setProducts([]);
      productResult.forEach((product) => {
        setProducts((products) => [...products, product]);
      });
    } catch (err) {
      return console.log(err);
    }
  };
  const getProductsByPartNumber = async (partNum) => {
    try {
      const result = await axios.get(
        `http://10.0.1.244/api/v2/products?search=${partNum}`
      );
      const productResult = result.data;
      setProduct([]);
      setProduct((product) => [...product, productResult]);
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    // Calling here to initialize on context load, only initializes on page load
    setSelectYearsAndMakes().then((res) => {
      setSelYears([]);
      setSelMakes([]);
      const years = res.data.years;
      const makes = res.data.makes;
      years.forEach((year) => {
        setSelYears((selYears) => [...selYears, year]);
      });
      makes.forEach((make) => {
        setSelMakes((selMakes) => [...selMakes, make]);
      });
    });
    getCategories().then((res) => {
      const allCategories = res.data;
      setCategories([]);
      allCategories.forEach((category) => {
        setCategories((categories) => [...categories, category]);
      });
    });
    getProducts().then((res) => {
      const productResult = res.data.products;
      setProducts([]);
      productResult.forEach((product) => {
        setProducts((products) => [...products, product]);
      });
    });
  }, []);

  const value = {
    selYears,
    selMakes,
    selModels,
    filteredProducts,
    product,
    products,
    categories,
    childCategories,
    filterByYear,
    filterByMake,
    getChildCategories,
    getCategoriesByModel,
    getProductsByPartNumber,
    getProductsByPageNumber,
    getFilteredProducts,
  };

  return (
    <>
      <DBContext.Provider value={value}>{children}</DBContext.Provider>
    </>
  );
};
