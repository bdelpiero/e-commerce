import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Route, Switch } from "react-router-dom";
import RegisterContainer from "./registerContainer";
import LoginContainer from "./LoginContainer";
import AdminConfigsContainer from "./AdminConfigsContainer";
import { useSelector, useDispatch } from "react-redux";
import ProductsContainer from "../containers/ProductsContainer";
import CartContainer from "./CartContainer";
import { loggUser } from "../store/action-creators/login";
import ProductContainer from "../containers/ProductContainer";

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state=> state.login.loggedUser)
  // const islogged = useSelector((state) => {
  //   return state.login.logged;
  // });

  useEffect(() => {
    //axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:1337/api/user/me")
      .then((res) => res.data)
      .then((user) => {
        dispatch(loggUser(user));
        return user
      })
      .catch(() => {
        console.log("not logged in");
      });
  }, []);

  useEffect(()=>{
      const productsArray = [];
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          productsArray.push(JSON.parse(localStorage.getItem(key)))
        }
      }
      axios.post(`http://localhost:1337/api/orders/newOrder/${user.id}`, {productsArray})
      .then(()=> localStorage.clear())
  }, [user])

  return (
    <div>
      <Navbar />
      <div>
        <Switch>
          <Route path='/register' component={RegisterContainer} />
          <Route path='/login' component={LoginContainer} />
          <Route exact path='/' component={ProductsContainer} />
          <Route exact path='/products' component={ProductsContainer} />
          <Route path='/cart' component={CartContainer} />
          <Route path='/configs' component={AdminConfigsContainer} />
          <Route path='/products/:productId' component={ProductContainer} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
