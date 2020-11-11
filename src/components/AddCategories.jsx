import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useStyles from "../styles/AdminConfigStyle";
import Button from "@material-ui/core/Button";
import CategoriesList from "./CategoriesList";

function AddCategories({
  handleChange,
  handleSubmit,
  value,
  message,
  categories,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formContainer}>
          <p className={classes.p}>Want to add or remove a Category?</p>
          <TextField
            onChange={handleChange}
            className={classes.margin}
            label='Category'
            name='name'
            value={value}
            InputProps={{}}
          />
          <div className={classes.alert}>{message}</div>
          <Button
            type='submit'
            className={classes.b}
            variant='contained'
            color='secondary'>
            add or remove category
          </Button>
        </FormControl>
      </form>
      <CategoriesList categories={categories} />
    </div>
  );
}

export default AddCategories;
