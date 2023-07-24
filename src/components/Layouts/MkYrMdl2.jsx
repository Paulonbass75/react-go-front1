import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MkYrMdl2() {
  // Initial setup
  const [data, setData] = useState({
    years: [],
    makes: [],
    models: [],
    categories: [],
    products: [],
    selYear: null,
    selMake: null,
    selModel: null,
  });

  // On component did mount equivalent
  useEffect(() => {
    axios.get("http://10.0.1.244/api/v2/filter").then((response) => {
      setData((prevState) => ({
        ...prevState,
        years: response.data.years,
        makes: response.data.makes,
      }));
      console.log(response.data.makes);
      console.log(response.data.years);
    });
    axios.get("http://10.0.1.244/api/v2/categories").then((response) => {
      setData((prevState) => ({
        ...prevState,
        categories: response.data,
      }));
    });
  }, []);
  
   useEffect(() => {
     filterChg();
   }, [data.selYear, data.selMake]);

  // methods
  const filterChg = () => {
    if (data.selMake === "null") {
      setData((prevState) => ({ ...prevState, selMake: null }));
    }
    if (data.selModel === "null") {
      setData((prevState) => ({ ...prevState, selModel: null }));
    }
    if (data.selYear === "null") {
      setData((prevState) => ({ ...prevState, selYear: null }));
    }
    if (data.selYear && !data.selMake) {
      axios
        .get("http://10.0.1.244/api/v2/filter?year=" + data.selYear)
        .then((response) => {
          setData((prevState) => ({
            ...prevState,
            years: response.data.years,
            makes: response.data.makes,
            selModel: null,
          }));
        });
    }
    if (!data.selYear && data.selMake) {
      axios
        .get("http://10.0.1.244/api/v2/filter?make=" + data.selMake)
        .then((response) => {
          setData((prevState) => ({
            ...prevState,
            years: response.data.years,
            models: response.data.models,
            selModel: null,
          }));
        });
    }
    if (data.selYear && data.selMake) {
      axios
        .get(
          "http://10.0.1.244/api/v2/filter?year=" +
            data.selYear +
            "&make=" +
            data.selMake
        )
        .then((response) => {
          setData((prevState) => ({
            ...prevState,
            models: response.data.models,
            makes: response.data.makes,
            years: response.data.years,
            selModel: null,
          }));
          if (response.data.makeclr) {
            setData((prevState) => ({
              ...prevState,
              selMake: null,
              products: [],
            }));
          }
          if (response.data.yearclr) {
            setData((prevState) => ({
              ...prevState,
              selYear: null,
              products: [],
            }));
          }
        });
    }
  };
useEffect(() => {
  modelChg();
}, [data.selYear, data.selMake, data.selModel]);

  const modelChg = () => {
    if (
      data.selModel !== "null" &&
      data.selMake &&
      (data.selYear || data.selYear !== "null")
    ) {
      axios
        .get(
          "http://10.0.1.244/api/v2/categories?model=" +
            data.selModel +
            "&year=" +
            data.selYear +
            "&make=" +
            data.selMake
        )
        .then((response) => {
          data.categories = response.data;
          data.products = [];
        });
    }
    if (
      data.selModel !== "null" &&
      data.selMake &&
      (!data.selYear || data.selYear === "null")
    ) {
      console.log("modelChg", data.selModel);
    }
  };

  const catSel = (catId) => {
    if (!data.selModel) {
      data.selMake = null;
      data.selYear = null;
      axios
        .get("http://10.0.1.244/api/v2/categories/" + catId)
        .then((response) => {
          data.categories = response.data.categories;
          data.products = response.data.products;
        });
    }
    if (data.selModel) {
      axios
        .get(
          "/api/v2/categories/" +
            catId +
            "?year=" +
            data.selYear +
            "&make=" +
            data.selMake +
            "&model=" +
            data.selModel
        )
        .then((response) => {
          data.categories = response.data.categories;
          data.products = response.data.products;
        });
      console.log(catId);
    }
  };

  // ...
  // Rest of the component
  return (
    <div className="container text-stone-600">
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="panel-body">
                <div className="form-group">
                  <label className="col-sm-2 control-label">Year</label>
                  <div className="col-sm-10">
                    <select
                      className="form-control"
                      id="selYear"
                      onChange={(e) =>
                        setData({ ...data, selYear: e.target.value })
                      }
                    >
                      <option value="null">Select Year</option>
                      {Object.keys(data.years).map((key, i) => (
                        <option key={data.years[i]} value={data.years[i]}>
                          {data.years[i]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">Make</label>
                  <div className="col-sm-10">
                    <select
                      className="form-control"
                      id="selMake"
                      onChange={(e) =>
                        setData({ ...data, selMake: e.target.value })
                      }
                    >
                      <option value="null">Select Make</option>
                      {Object.keys(data.makes).map((key, index) => (
                        <option key={key} value={data.makes[index].id}>
                          {data.makes[index].make}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-2 control-label">Model</label>
                  <div className="col-sm-10">
                    <select
                      className="form-control"
                      id="selModel"
                      onChange={(e) =>
                        setData({ ...data, selModel: e.target.value })
                      }
                    >
                      <option value="null">Select Model</option>
                      {Object.keys(data.models).map((model, index) => (
                        <option key={model} value={data.models[index].id}>
                          {data.models[index].model}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
