import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"
import { Route, Redirect, Switch } from 'react-router-dom';
import RegisterContainer from "./registerContainer"
import LoginContainer from "./LoginContainer"
import AdminConfigsContainer from "./AdminConfigsContainer"
import { useSelector, useDispatch } from "react-redux";
import ProductsContainer from "../containers/ProductsContainer"
import { fetchIsLogged,login,loggUser } from "../store/action-creators/login"
import axios from 'axios'
axios.defaults.withCredentials = true;

function App() {
const dispatch = useDispatch()
const islogged = useSelector((state)=>{
return state.login.logged
})
const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

useEffect(()=>{
axios.get("http://localhost:1337/api/user/verificate",{},config)
     .then(res => res.data)
     .then(data=> dispatch(login(data)))
},[])

  return (
    <div>

    <Navbar />
    <div>
      <Switch>
         <Route path="/register" component={RegisterContainer} />
         <Route path="/login" component={LoginContainer} />
        {/* <Route exact path ="/" /> */}
        <Route path="/products" component={ProductsContainer}/>
        <Route path="/configs" component={AdminConfigsContainer}/>
        <Route path="/products/:productId"/>

      </Switch>
      </div>
    </div>
  )
}

export default App;
