import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDB } from "../contexts/Context";

// create a context for the filter data

export default function MkYrMdl2() {
  // Initial setup
  const {
    selYears,
    selMakes,
    selModels,
    filterByYear,
    filterByMake,
    getCategoriesByModel,
    getFilteredProducts,
  } = useDB();
  // The use of refs is for the selects current values to always be current,
  // rather than setting these values on element change which is an expensive call
  // in react
  const selectedYear = useRef();
  const selectedMake = useRef();
  const selectedModel = useRef();
  // const [years, setYears] = useState(()=>{
  //   return selYears;
  // });
  const [data, setData] = useState({
    // years: [],
    // makes: [],
    models: [],
    categories: [],
    products: [],
    selYear: null,
    selMake: null,
    selModel: null,
  });

  // On component did mount equivalent
  useEffect(() => {
    // axios.get("http://10.0.1.244/api/v2/filter").then((response) => {
    //   setData((prevState) => ({
    //     ...prevState,
    //     years: response.data.years,
    //     makes: response.data.makes,
    //   }));
    //   console.log(response.data.makes);
    //   console.log(response.data.years);
    // });
    axios.get("http://10.0.1.244/api/v2/categories").then((response) => {
      setData((prevState) => ({
        ...prevState,
        categories: response.data,
      }));
    });
  }, []);

  // useEffect(() => {
  //   filterChg();
  // }, [data.selYear, data.selMake]);

  // // methods
  // const filterChg = () => {
  //   if (data.selMake === "null") {
  //     setData((prevState) => ({ ...prevState, selMake: null }));
  //   }
  //   if (data.selModel === "null") {
  //     setData((prevState) => ({ ...prevState, selModel: null }));
  //   }
  //   if (data.selYear === "null") {
  //     setData((prevState) => ({ ...prevState, selYear: null }));
  //   }
  //   if (data.selYear && !data.selMake) {
  //     axios
  //       .get("http://10.0.1.244/api/v2/filter?year=" + data.selYear)
  //       .then((response) => {
  //         setData((prevState) => ({
  //           ...prevState,
  //           years: response.data.years,
  //           makes: response.data.makes,
  //           selModel: null,
  //         }));
  //       });
  //   }
  //   if (!data.selYear && data.selMake) {
  //     axios
  //       .get("http://10.0.1.244/api/v2/filter?make=" + data.selMake)
  //       .then((response) => {
  //         setData((prevState) => ({
  //           ...prevState,
  //           years: response.data.years,
  //           models: response.data.models,
  //           selModel: null,
  //         }));
  //       });
  //   }
  //   if (data.selYear && data.selMake) {
  //     axios
  //       .get(
  //         "http://10.0.1.244/api/v2/filter?year=" +
  //           data.selYear +
  //           "&make=" +
  //           data.selMake
  //       )
  //       .then((response) => {
  //         setData((prevState) => ({
  //           ...prevState,
  //           models: response.data.models,
  //           makes: response.data.makes,
  //           years: response.data.years,
  //           selModel: null,
  //         }));
  //         if (response.data.makeclr) {
  //           setData((prevState) => ({
  //             ...prevState,
  //             selMake: null,
  //             products: [],
  //           }));
  //         }
  //         if (response.data.yearclr) {
  //           setData((prevState) => ({
  //             ...prevState,
  //             selYear: null,
  //             products: [],
  //           }));
  //         }
  //       });
  //   }
  // };
  // useEffect(() => {
  //   modelChg();
  // }, [data.selYear, data.selMake, data.selModel]);

  // const modelChg = () => {
  //   if (
  //     data.selModel !== "null" &&
  //     data.selMake &&
  //     (data.selYear || data.selYear !== "null")
  //   ) {
  //     axios
  //       .get(
  //         "http://10.0.1.244/api/v2/categories?model=" +
  //           data.selModel +
  //           "&year=" +
  //           data.selYear +
  //           "&make=" +
  //           data.selMake
  //       )
  //       .then((response) => {
  //         data.categories = response.data;
  //         data.products = [];
  //       });
  //   }
  //   if (
  //     data.selModel !== "null" &&
  //     data.selMake &&
  //     (!data.selYear || data.selYear === "null")
  //   ) {
  //     console.log("modelChg", data.selModel);
  //   }
  // };

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
    <div className="w-full py-4 ps-24 bg-stone-900 hidden min-[1024px]:flex flex-row items-center sticky">
      <div className="container text-stone-600">
        <div className="row h-full">
          <div className="col-md-12 h-full">
            <div className="panel panel-default h-full">
              <div className="panel-heading h-full">
                <div className="panel-body flex flex-row items-center h-full max-[1024px]:flex-col">
                  <div className="form-group px-3 relative max-[1024px]:w-full">
                    {/* <label className="col-sm-2 control-label absolute -top-5 left-3 text-white max-[1024px]:-top-6">
                    Year
                  </label> */}
                    <div className="col-sm-10 max-[1024px]:w-full max-[1024px]:mb-6">
                      <select
                        className="form-control rounded-md text-lg pe-2 py-1 max-[1024px]:w-full"
                        id="selYear"
                        ref={selectedYear}
                        onChange={() => {
                          selectedMake.current.value = "";
                          selectedModel.current.value = "";
                          filterByYear(selectedYear.current.value);
                        }}
                      >
                        {/* selYears is the array of years coming from the context */}
                        <option value="">Select Year</option>
                        {Object.keys(selYears).map((key, i) => (
                          <option key={key} value={selYears[i]}>
                            {selYears[i]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group px-3 relative max-[1024px]:w-full max-[1024px]:mb-6">
                    {/* <label className="col-sm-2 control-label absolute -top-5 left-3 text-white max-[1024px]:-top-6">
                    Make
                  </label> */}
                    <div className="col-sm-10 max-[1024px]:w-full">
                      <select
                        className="form-control rounded-md text-lg pe-2 py-1 max-[1024px]:w-full"
                        id="selMake"
                        ref={selectedMake}
                        onChange={() => {
                          selectedModel.current.value = "";
                          filterByMake(
                            selectedYear.current.value,
                            selectedMake.current.value
                          );
                        }}
                      >
                        <option value="">Select Make</option>
                        {Object.keys(selMakes).map((key, index) => (
                          <option key={key} value={selMakes[index].id}>
                            {selMakes[index].make}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group px-3 relative max-[1024px]:w-full max-[1024px]:mb-6">
                    {/* <label className="col-sm-2 control-label absolute -top-5 left-3 text-white max-[1024px]:-top-6">
                    Model
                  </label> */}
                    <div className="col-sm-10 max-[1024px]:w-full">
                      <select
                        className="form-control rounded-md text-lg pe-2 py-1 max-[1024px]:w-full"
                        id="selModel"
                        ref={selectedModel}
                        onChange={(e) => {
                          getCategoriesByModel(
                            selectedYear.current.value,
                            selectedMake.current.value,
                            selectedModel.current.value
                          );
                          setData({ ...data, selModel: e.target.value });
                        }}
                      >
                        <option value="">Select Model</option>
                        {Object.keys(selModels).map((key, index) => (
                          <option key={key} value={selModels[index].id}>
                            {selModels[index].model}
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
    </div>
  );
}
