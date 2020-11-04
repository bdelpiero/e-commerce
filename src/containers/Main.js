import React from "react"
import Navbar from "../components/Navbar"
import { Route, Redirect, Switch } from 'react-router-dom';
import RegisterContainer from "./registerContainer"
import LoginContainer from "./LoginContainer"

function App() {
  return (
    <div>
    <Navbar />
      <Switch>
         <Route path="/register" component={RegisterContainer} />
         <Route path="/login" component={LoginContainer} />
      </Switch>
    </div>
  );
}

export default App;
