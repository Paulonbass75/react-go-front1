import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
  })

  // On component did mount equivalent
  useEffect(() => {
    axios.get("http://10.0.1.244/api/v2/filter").then((response) => {
      setData((prevState) => ({
        ...prevState,
        years: response.data.years,
        makes: response.data.makes,
      }));
    });
    axios.get("http://10.0.1.244/api/v2/categories").then((response) => {
      setData((prevState) => ({
        ...prevState,
        categories: response.data,
      }));
    });
  }, [])

  // methods
  const filterChg = () => {
    if(this.selMake === 'null')
            {
                this.selMake = null
            }
            if(this.selModel === 'null')
            {
                this.selModel = null
            }
            if(this.selYear === 'null')
            {
                this.selYear = null
            }
            if(this.selYear && !this.selMake)
            {
                axios
                  .get("http://10.0.1.244/api/v2/filter?year=" + this.selYear)
                  .then((response) => {
                    this.years = response.data.years;
                    this.makes = response.data.makes;
                    this.selModel = null;
                  });
            }
            if(!this.selYear && this.selMake)
            {
                axios
                  .get("http://10.0.1.244/api/v2/filter?make=" + this.selMake)
                  .then((response) => {
                    this.years = response.data.years;
                    this.models = response.data.models;
                    this.selModel = null;
                  });
            }
            if(this.selYear && this.selMake)
            {
                axios
                  .get(
                    "http://10.0.1.244/api/v2/filter?year=" +
                      this.selYear +
                      "&make=" +
                      this.selMake
                  )
                  .then((response) => {
                    this.models = response.data.models;
                    this.makes = response.data.makes;
                    this.years = response.data.years;
                    this.selModel = null;
                    if (response.data.makeclr) {
                      this.selMake = null;
                      this.products = [];
                    }
                    if (response.data.yearclr) {
                      this.selYear = null;
                      this.products = [];
                    }
                    console.log(response.data);
                  });
            }
  }

  const modelChg = () => {
     if(this.selModel !== 'null' && this.selMake && (this.selYear || this.selYear !== 'null'))
            {
                axios
                  .get(
                    "http://10.0.1.244/api/v2/categories?model=" +
                      this.selModel +
                      "&year=" +
                      this.selYear +
                      "&make=" +
                      this.selMake
                  )
                  .then((response) => {
                    this.categories = response.data;
                    this.products = [];
                  });
            }
            if(this.selModel !== 'null' && this.selMake && (!this.selYear || this.selYear === 'null'))
            {
                console.log('1')
            }
  }

  const catSel = (catId) => {
   if(!this.selModel)
            {
                this.selMake = null
                this.selYear = null
                axios
                  .get("http://10.0.1.244/api/v2/categories/" + catId)
                  .then((response) => {
                    this.categories = response.data.categories;
                    this.products = response.data.products;
                  });
            }
            if(this.selModel)
            {
                axios
                  .get(
                    "http://10.0.1.244/api/v2/categories/" +
                      catId +
                      "?year=" +
                      this.selYear +
                      "&make=" +
                      this.selMake +
                      "&model=" +
                      this.selModel
                  )
                  .then((response) => {
                    this.categories = response.data.categories;
                    this.products = response.data.products;
                  });
                console.log(catId)
            }
  }

  // ...
  // Rest of the component
  return (
    <div className="container">
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
                      {Object.keys(year).map((key, i) => (
                        <option key={year[i].year} value={year[i].year}>
                          {year[i].year}
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
                      {/* <option value="null">Select Make</option>
            {data.makes.map((make) => (
              <option key={make} value={make}>{make}</option>
            ))} */}
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
                      {/* <option value="null">Select Model</option>
            {data.models.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))} */}
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


