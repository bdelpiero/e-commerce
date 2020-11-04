import React, { useState, useEffect } from 'react';
import AdminConfigs from '../components/AdminConfigs'

function AdminConfigsContainer(){
const [username, setUsername] = useState("")
const [email,setEmail] = useState("")

const handleChange = (e) => {
  const name = e.target.name
  if (name == "username")setUsername(e.target.value)
  if (name == setEmail)setEmail(e.target.value)
}

  return(
    <AdminConfigs handleChange={handleChange}/>
  )
}

export default AdminConfigsContainer
