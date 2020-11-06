import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight:"20%",
    marginTop:"5%",
    display: 'flex',
    flexWrap: 'wrap',
    position:"fixed",
    left:"30%"
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  center:{
    marginTop:"2%",
    position:"fixed",
    right:"45%",
    fontWeight: "700"
  },
  b:{
    marginTop: "2%",
    paddingRight:"50%"
 },

}));

export default function AddProducts({ handleChange, handleSubmit }) {
  const classes = useStyles();


  return (
    <div >
      <p className={classes.center}> Add a new product</p>
    <form onSubmit={handleSubmit} className={classes.root}>

    <TextField
      onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      label="Title"
      name="title"
      autoComplete="email"
      autoFocus
    />
    <TextField
    onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      name="author"
      label="Author"
      type="text"
    />


    <TextField
    onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      name="isbn"
      label="ISBN"
      type="text"
    />
    <TextField
    onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      name="publisher"
      label="Publisher"
      type="text"
    />



    <TextField
    onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="description"
      label="Description"
      type="text"
    />
    <TextField
    onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="imageUrl"
      label="ImageUrl"
      type="text"
    />



    <TextField
    onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      name="stock"
      label="Stock"
      type="Stock"
    />
    <TextField
    onChange={handleChange}
      variant="outlined"
      margin="normal"
      name="price"
      label="Amount"
      type="Stock"
    />

    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
    >
      Sign In
    </Button>

    <Grid container>
      <Grid item>

      </Grid>
    </Grid>

      </form>
      </div>

  );
}
