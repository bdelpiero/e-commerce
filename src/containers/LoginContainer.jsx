import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Login from "../components/Login"
import { useSelector, useDispatch } from "react-redux";
import { fetchLogin, loggUser, login  } from "../store/action-creators/login"


function LoginContainer(){
const dispatch = useDispatch()
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const history = useHistory()

const handleChange = (e) =>{
  const name = e.target.name
  if (name == "email")setEmail(e.target.value)
  if (name == "password")setPassword(e.target.value)
}

const handleSubmit = (e) => {
  e.preventDefault()
  console.log('login attempt...')
  dispatch(fetchLogin(email,password))
  .then(()=> dispatch(login(true)))
  .then(()=> history.push("/"))

}

  return(
    <Login handleSubmit={handleSubmit} handleChange={handleChange}/>
  )
}

export default LoginContainer
