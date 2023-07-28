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
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Sets years and makes on page load or empty selects. ONLY ON PAGE LOAD
  const setSelectYearsAndMakes = async () => {
    try {
      return await axios.get("http://10.0.1.244/api/v2/filter");
    } catch (err) {
      return console.log(err);
    }
  };
 //Sets makes by year selected, changes make options everytime year is selected.
  const filterByYear = async (selYear) => {
    try {
      const result = await axios.get(`http://10.0.1.244/api/v2/filter?year=${selYear}`);
      const makes = result.data.makes;
      setSelMakes([])
      makes.forEach((make) => {
        setSelMakes((selMakes) => [...selMakes, make]);
      });
    } catch (err) {
      return console.log(err);
    }
  }

  const filterByMake = async (selYear, selMake) => {
    try {
      const result = await axios.get(`http://10.0.1.244/api/v2/filter?year=${selYear}&make=${selMake}`);
      const models = result.data.models;
      setSelModels([])
      models.forEach((model) => {
        setSelModels((selModels) => [...selModels, model]);
      });
    } catch (err) {
      return console.log(err);
    }
  }

  const getCategoriesByModel = async (selYear, selMake, selModel) => {
    try {
      const result = await axios.get(`http://10.0.1.244/api/v2/categories?model=${selModel}&year=${selYear}&make=${selMake}`);
      const categories = result.data;
      setFilteredCategories([])
      categories.forEach((category) => {
        setFilteredCategories((filteredCategories) => [...filteredCategories, category]);
      });
    } catch (err) {
      return console.log(err);
    }
  }

  const getFilteredProducts = async (categoryId, selYear, selMake, selModel) => {
    try {
      const result = await axios.get(`http://10.0.1.244/api/v2/categories/${categoryId}?model=${selModel}&year=${selYear}&make=${selMake}`);
      console.log(result);
      const products = result.data;
      setFilteredProducts([])
      products.forEach((category) => {
        setFilteredProducts((filteredProducts) => [...filteredProducts, category]);
      });
    } catch (err) {
      return console.log(err);
    }
  }

  const setSelectMakes = () => {};

  const setSelectModels = () => {};

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
  }, []);

  const value = {
    selYears,
    selMakes,
    selModels,
    filteredCategories,
    filteredProducts,
    filterByYear,
    filterByMake,
    getCategoriesByModel,
    getFilteredProducts
  };

  return (
    <>
      <DBContext.Provider value={value}>{children}</DBContext.Provider>
    </>
  );
};
