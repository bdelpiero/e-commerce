import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Route, Redirect, Switch } from "react-router-dom";
import RegisterContainer from "./registerContainer";
import LoginContainer from "./LoginContainer";
import AdminConfigsContainer from "./AdminConfigsContainer";
import { useSelector, useDispatch } from "react-redux";
import ProductsContainer from "../containers/ProductsContainer";
import CartContainer from "./CartContainer";
import { fetchIsLogged, login, loggUser } from "../store/action-creators/login";
import ProductContainer from "../containers/ProductContainer";
import { createCart } from "../store/action-creators/cart";
import CompletedOrdersContainer from "../containers/CompletedOrdersContainer";
import CompletedOrderDetailContainer from "../containers/CompletedOrderDetailsContainer";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  // const islogged = useSelector((state) => {
  //   return state.login.logged;
  // });

  useEffect(() => {
    //axios.defaults.withCredentials = true;

    axios
      .get("http://localhost:1337/api/user/me")
      .then((res) => res.data)
      .then((user) => {
        console.log(user);
        dispatch(loggUser(user));
        return user;
      })
      .then((user) => {
        console.log("USUARIO ANTES DE SALIR", user);
        const productsArray = [];
        for (const key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            productsArray.push(JSON.parse(localStorage.getItem(key)));
          }
        }
        return axios.post(
          `http://localhost:1337/api/orders/newOrder/${user.id}`,
          { productsArray }
        );
      })
      .catch(() => {
        console.log("not logged in");
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <Switch>
          <Route path="/register" component={RegisterContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route exact path="/" component={ProductsContainer} />
          <Route exact path="/products" component={ProductsContainer} />
          <Route exact path="/completed" component={CompletedOrdersContainer} />
          <Route
            exact
            path="/details"
            component={CompletedOrderDetailContainer}
          />
          <Route path="/cart" component={CartContainer} />
          <Route path="/configs" component={AdminConfigsContainer} />
          <Route path="/products/:productId" component={ProductContainer} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
