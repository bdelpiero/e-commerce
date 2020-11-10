import React, { useState, useEffect } from 'react';
import AddCategories from '../components/AddCategories'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'

function AddCategoriesContainer(){
const dispatch = useDispatch();
const [category, setCategory] = useState("")
const counter = useSelector((state) => {
  return state.categories.count
})
const [count,setCount] = useState(counter)

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
  .then(()=>dispatch(setCount(count+1)),console.log(count))
  .catch(() => setCategory(""))
}

  return(
    <AddCategories value={category} handleChange={handleChange} handleSubmit={handleSubmit}/>
  )
}

export default AddCategoriesContainer
