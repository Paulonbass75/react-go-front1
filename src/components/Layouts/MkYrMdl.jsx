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
      setMakes(data.makes);
      setModels(data.model);
      setYears(data.years);
      console.log(data, makes ,years);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);
 
   const handleMakeChange = (event) => {
    setSelectedMake(event.target.value);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    if (data.length > 0) {
      // Check if data is available before using filter
      const newData = data.filter(car =>
          (selectedMake === "" || car.make === selectedMake) &&
          (selectedModel === "" || car.model === selectedModel) &&
          (selectedYear === "" || car.year === selectedYear)
      );
      setFilteredData(newData);
    }
  }, [selectedMake, selectedModel, selectedYear, data]);


  return (
    <div>
      <select
        className="bg-slate-800 hover:bg-slate-800 hover:bg-opacity-90 text-white hover:text-[#00cbff] duration-200 py-3 px-10 border-white border group-hover:pointer-events-auto text-center"
        value={selectedMake}
        onChange={handleMakeChange}
      >
        <option value="">All Makes</option>
        {Object.keys(makes).map((key, i) => (
          <option key={makes[i].id} value={makes[i].make}>
            {makes[i].make}
          </option>
        ))}
      </select>

      {/* <select
        className="bg-slate-800 hover:bg-slate-800 hover:bg-opacity-90 text-white hover:text-[#00cbff] duration-200 py-3 px-10 border-white border group-hover:pointer-events-auto text-center"
        value={selectedModel}
        onChange={handleModelChange}
      >
        <option value="">All Models</option>
        {Object.keys(models).map((key, i) => (
          <option key={models[i].id} value={models[i].id}>
            {models[i].id}
          </option>
        ))}
      </select> */}

      <select
        className="bg-slate-800 hover:bg-slate-800 hover:bg-opacity-90 text-white hover:text-[#00cbff] duration-200 py-3 px-10 border-white border group-hover:pointer-events-auto text-center"
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value="">All Years</option>
        {Object.keys(years).map((key, i) => (
          <option key={years[i]} value={years[i]}>
            {years[i]}
          </option>
        ))}
      </select>

      <ul>
        {filteredData.map((car, index) => (
          <li key={index}>
            {car.makes} - {car.model} - {car.years}
          </li>
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
