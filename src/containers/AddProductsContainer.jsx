import React, { useState, useEffect } from 'react';
import AddProducts from '../components/AddProducts'
import axios from 'axios'

function AddProductsContainer(){

const [title, setTitle] = useState("")
const [author,setAuthoer] = useState("")
const [isbn,setIsbn] = useState("")
const [publisher, setPublisher] = useState("")
const [description, setDescription] = useState("")
const [imageUrl, setImageUrl] = useState("")
const [stock, setStock] = useState("")
const [amount, setAmount] = useState("")


const handleChange = (e) =>{
const name = e.target.name
if (name == "title")setTitle(e.target.value)
if (name == "author")setAuthoer(e.target.value)
if (name == "isbn")setIsbn(e.target.value)
if (name == "publisher")setPublisher(e.target.value)
if (name == "description")setDescription(e.target.value)
if (name == "imageUrl")setImageUrl(e.target.value)
if (name == "stock")setStock(e.target.value)
if (name == "price")setAmount(e.target.value)
}

const handleSubmit = (e) => {
e.preventDefault()
console.log("submit attempt");
axios.post("http://localhost:1337/api/products/add",{
  title: title,
  price: amount,
  description: description,
  stock: stock,
  imageUrl:imageUrl,
  ISBN: isbn,
  author: author,
  publisher: publisher
}).then(res => res.data)
.then(data => console.log(data))
.catch(err=> console.log(err))
}

  return(
    <AddProducts handleChange={handleChange} handleSubmit={handleSubmit} />
  )
}


export default AddProductsContainer
