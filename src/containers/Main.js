import React, { useEffect } from "react"

import Navbar from "../components/Navbar"
import { Route, Redirect, Switch } from 'react-router-dom';
import RegisterContainer from "./registerContainer"
import LoginContainer from "./LoginContainer"

import ProductsContainer from "../containers/ProductsContainer";
import ProductContainer from "../containers/ProductContainer"



function App() {
  return (
    <div>

    <Navbar />
      <Switch>
         <Route path="/register" component={RegisterContainer} />
         <Route path="/login" component={LoginContainer} />
        {/* <Route exact path ="/" /> */}
        <Route exact path="/products" component={ProductsContainer}/>
        <Route path="/products/:productId" component={ProductContainer}/>

      </Switch>
    </div>
  );
}

export default App;
