import React, { useState, useEffect } from 'react';
import AdminConfigs from '../components/AdminConfigs'
import axios from 'axios'

function AdminConfigsContainer(){
const [email,setEmail] = useState("")
const [message, setMessage] = useState("")

const handleChange = (e) => {
setEmail(e.target.value)
}
const handleSubmit = (e) => {
  e.preventDefault()
  console.log("create admin attempt...");
  axios.put('http://localhost:1337/api/user/admin',{
    email:email
  }).then(res=> res.data)
    .then(()=> setMessage("Please refresh the page to see changes"))
    .catch(err=> console.log(err))

}

  return(
    <AdminConfigs message={message} handleSubmit={handleSubmit} handleChange={handleChange}/>
  )
}

export default AdminConfigsContainer
