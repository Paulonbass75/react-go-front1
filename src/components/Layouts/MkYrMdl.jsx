//make year models available from mysql database
import React from 'react'
import { useState, useEffect } from 'react'


export default function MkYrMdl() {

   const [data, setData] = useState([]);
   const [makes, setMakes] = useState([]);
   const [models, setModels] = useState([]);
   const [years, setYears] = useState([]);
   const [selectedMake, setSelectedMake] = useState("");
   const [selectedModel, setSelectedModel] = useState("");
   const [selectedYear, setSelectedYear] = useState("");
   const [filteredData, setFilteredData] = useState([]);
  
 

//fetch data from mysql database
useEffect(() => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  fetch(`http://10.0.1.244/api/v2/filter`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setMakes([...new Set(makes.map((car) => car.makes))]);
      // setModels([...new Set(model.map((car) => car.model))]);
      setYears([...new Set(years.map((car) => car.years))]);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      console.log(data, makes ,years);
    });
}, [data, makes, years]);
 
   const handleMakeChange = (event) => {
    setSelectedMake(event.target.value);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // useEffect(() => {
  //   const filteredData = data.filter(car =>
  //     (selectedMake === '' || car.make === selectedMake) &&
  //     (selectedModel === '' || car.model === selectedModel) &&
  //     (selectedYear === '' || car.year === selectedYear)
  //   );
  //   setFilteredData(filteredData);
  // }, [selectedMake, selectedModel, selectedYear, data]);


  return (
    <div>
      <select value={selectedMake} onChange={handleMakeChange}>
        <option value="">All Makes</option>
        {makes.map((make, index) => (
          <option key={index} value={make}>{make}</option>
        ))}
      </select>

      <select value={selectedModel} onChange={handleModelChange}>
        <option value="">All Models</option>
        {models.map((model, index) => (
          <option key={index} value={model}>{model}</option>
        ))}
      </select>

      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">All Years</option>
        {years.map((years, index) => (
          <option key={index} value={years}>{years}</option>
        ))}
      </select>

      <ul>
        {filteredData.map((car, index) => (
          <li key={index}>{car.make} - {car.model} - {car.year}</li>
        ))}
      </ul>
    </div>
  );



//display data in a dropdown menu
//allow user to select year model

//allow user to select make
//allow user to select model


  // return (
  //   <div>MkYrMdl</div>
  // )
}
