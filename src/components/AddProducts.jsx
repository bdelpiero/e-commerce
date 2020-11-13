import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "20%",
    marginTop: "5%",
    display: "flex",
    flexWrap: "wrap",
    position: "fixed",
    left: "30%",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  center: {
    marginTop: "2%",
    position: "fixed",
    right: "45%",
    fontWeight: "700",
  },
  b: {
    marginTop: "2%",
    paddingRight: "50%",
  },
  select: {
    margin: theme.spacing(1),
    width: "25ch",
    margin: 0,
  },
}));

export default function AddProducts({
  handleChange,
  handleSubmit,
  open,
  handleClose,
  handleOpen,
  category,
  categories,
  title,
  author,
  isbn,
  publisher,
  description,
  imageUrl,
  stock,
  amount,
}) {
  const classes = useStyles();

  return (
    <div>
      <p className={classes.center}> Add a new product</p>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          onChange={handleChange}
          variant='outlined'
          margin='normal'
          required
          label='Title'
          name='title'
          autoComplete='email'
          autoFocus
          value={title}
        />
        <TextField
          onChange={handleChange}
          variant='outlined'
          margin='normal'
          required
          name='author'
          label='Author'
          type='text'
          value={author}
        />

        <TextField
          onChange={handleChange}
          variant='outlined'
          margin='normal'
          required
          name='isbn'
          label='ISBN'
          type='text'
          value={isbn}
        />
        <TextField
          onChange={handleChange}
          variant='outlined'
          margin='normal'
          required
          name='publisher'
          label='Publisher'
          type='text'
          value={publisher}
        />

        <TextField
          onChange={handleChange}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='description'
          label='Description'
          type='text'
          value={description}
        />
        <TextField
          onChange={handleChange}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='imageUrl'
          label='ImageUrl'
          type='text'
          value={imageUrl}
        />

        <TextField
          onChange={handleChange}
          variant='outlined'
          margin='normal'
          required
          name='stock'
          label='Stock'
          type='Stock'
          value={stock}
        />
        <TextField
          onChange={handleChange}
          variant='outlined'
          margin='normal'
          name='price'
          label='Amount'
          type='Stock'
          value={amount}
        />
        {/* <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel htmlFor='outlined-age-native-simple'>Age</InputLabel>
          <Select native value='' onChange={handleChange} label='Age'>
            <option aria-label='None' value='' />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl> */}
        <FormControl variant='outlined' margin='normal'>
          <InputLabel id='demo-simple-select-outlined-label'>
            Category
          </InputLabel>
          <Select
            labelId='demo-controlled-open-select-label'
            id='demo-simple-select-outlined'
            name='category'
            margin='normal'
            required
            fullWidth
            className={classes.select}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={category}
            label='Category'
            onChange={handleChange}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {categories.length !== 0 &&
              categories.map((current) => (
                <MenuItem key={current.id} value={current.name}>
                  {current.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='secondary'
          className={classes.submit}>
          Add product
        </Button>

        <Grid container>
          <Grid item></Grid>
        </Grid>
      </form>
    </div>
  );
}
