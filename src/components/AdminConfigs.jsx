import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Route, Redirect, Switch } from "react-router-dom";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useStyles from "../styles/AdminConfigStyle";
import Button from "@material-ui/core/Button";
import SecondSideBar from "./SecondSideBar";
import AddAdmin from "./AddAdmin";
import AddProductsContainer from "../containers/AddProductsContainer";
import AddCategoriesContainer from "../containers/AddCategoriesContainer";
import Dashboard from "../components/Dashboard/Dashboard";
import RemoveProductsContainer from "../containers/RemoveProductsContainer";
import "../styles/ProductsStyle.css";

function AdminConfigs({ handleChange, handleSubmit, message, users }) {
  const classes = useStyles();

  return (
    <div>
      <SecondSideBar />
      <Switch>
        <Route
          exact
          path='/configs/addadmin'
          render={() => (
            <AddAdmin
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              message={message}
              users={users}
            />
          )}
        />
        <Route
          exact
          path='/configs/addproducts'
          component={AddProductsContainer}
        />
        <Route
          exact
          path='/configs/removeproducts'
          component={RemoveProductsContainer}
        />
        <Route
          exact
          path='/configs/addcategories'
          component={AddCategoriesContainer}
        />
        <Route exact path='/configs/dashboard' component={Dashboard} />
        <Redirect from='/configs' to='/configs/addadmin' />
      </Switch>
    </div>
  );
}

export default AdminConfigs;
