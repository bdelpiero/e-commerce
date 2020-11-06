import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Route, Redirect, Switch } from "react-router-dom";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useStyles from '../styles/AdminConfigStyle'
import Button from '@material-ui/core/Button';
import SecondSideBar from './SecondSideBar'
import AddAdmin from './AddAdmin'
import AddProductsContainer from '../containers/AddProductsContainer'

 function AdminConfigs({ handleChange, handleSubmit }) {
  const classes = useStyles();

  return (
    <div>
    <SecondSideBar/>
      <Switch>
      <Route exact path='/configs/addadmin' render={()=> <AddAdmin handleChange={handleChange} handleSubmit={handleSubmit}/>} />
      <Route exact path='/configs/addproducts' component={AddProductsContainer} />
      </Switch>
    </div>
  );
}


export default AdminConfigs
