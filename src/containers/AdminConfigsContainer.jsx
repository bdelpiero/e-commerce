import React, { useState, useEffect } from 'react';
import AdminConfigs from '../components/AdminConfigs'
import axios from 'axios'

function AdminConfigsContainer(){
const [email,setEmail] = useState("")

const handleChange = (e) => {
setEmail(e.target.value)
}
const handleSubmit = (e) => {
  e.preventDefault()
  console.log("create admin attempt...");
  axios.put('http://localhost:1337/api/user/admin',{
    email:email
  }).then(res=> res.data)
    .catch(err=> console.log(err))

}

  return(
    <AdminConfigs handleSubmit={handleSubmit} handleChange={handleChange}/>
  )
}

export default AdminConfigsContainer
