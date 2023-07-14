import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function MyComponent() {
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
    axios.get('/api/v2/filter').then((response) => {
      setData(prevState => ({
        ...prevState,
        years: response.data.years,
        makes: response.data.makes,
      }))
    })
    axios.get('/api/v2/categories').then((response) => {
      setData(prevState => ({
        ...prevState,
        categories: response.data
      }))
    })
  }, [])

  // methods
  const filterChg = () => {
    if(this.selMake == 'null')
            {
                this.selMake = null
            }
            if(this.selModel == 'null')
            {
                this.selModel = null
            }
            if(this.selYear == 'null')
            {
                this.selYear = null
            }
            if(this.selYear && !this.selMake)
            {
                axios.get('/api/v2/filter?year='+this.selYear)
                .then((response) => {
                    this.years = response.data.years
                    this.makes = response.data.makes
                    this.selModel = null
                })
            }
            if(!this.selYear && this.selMake)
            {
                axios.get('/api/v2/filter?make='+this.selMake)
                .then((response) => {
                    this.years = response.data.years
                    this.models = response.data.models
                    this.selModel = null
                })
            }
            if(this.selYear && this.selMake)
            {
                axios.get('/api/v2/filter?year='+this.selYear+'&make='+this.selMake)
                .then((response) => {
                    this.models = response.data.models
                    this.makes = response.data.makes
                    this.years = response.data.years
                    this.selModel = null
                    if(response.data.makeclr)
                    {
                        this.selMake = null
                        this.products = []
                    }
                    if(response.data.yearclr)
                    {
                        this.selYear = null
                        this.products = []
                    }
                })
            }
  }

  const modelChg = () => {
    // ...
    // Rest of the code for this method
  }

  const catSel = (catId) => {
    // ...
    // Rest of the code for this method
  }

  // ...
  // Rest of the component
  return (
    // render method here
  )
}
