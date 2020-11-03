import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import Navbar from "../components/Navbar";
import ProductsContainer from "../containers/ProductsContainer"


function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        {/* <Route exact path ="/" /> */}
        <Route path="/products" component={ProductsContainer}/>
        <Route path="/products/:productId"/>
      </Switch>
    </div>
  );
}

export default App;
