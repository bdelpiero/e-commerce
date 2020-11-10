import React, { useState, useEffect } from 'react';
import AddCategories from '../components/AddCategories'
import axios from 'axios'

function AddCategoriesContainer(){

const [category, setCategory] = useState("")


const handleChange = (e) => {
  setCategory(e.target.value)
}

const handleSubmit = (e) => {
  e.preventDefault()
  axios.post('http://localhost:1337/api/categories',{
    name: category
  })
  .then(res => res.data)
  .then(data => console.log(data, " created successfully"))
  .then(()=> setCategory(""))
  .catch(() => setCategory(""))
}

  return(
    <AddCategories value={category} handleChange={handleChange} handleSubmit={handleSubmit}/>
  )
}

export default AddCategoriesContainer
