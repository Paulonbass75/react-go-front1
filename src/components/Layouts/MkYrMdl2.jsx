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
    // ...
    // Rest of the code for this method
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
