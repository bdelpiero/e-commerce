import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useStyles from '../styles/AdminConfigStyle'
import Button from '@material-ui/core/Button';


 function AdminConfigs({handleChange, handleSubmit}) {
  const classes = useStyles();

  return (
    <div className={classes.center}>
    <p className="">Want to add a new admin?</p>
    <form onSubmit={handleSubmit}>
      <FormControl className={classes.margin}>
        
        <TextField
          className={classes.margin}
          id="input-with-icon-textfield"
          onChange={handleChange}
          label="email"
          name="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" className={classes.b} variant="contained" color="secondary">
        create admin
      </Button>
      </FormControl>
      </form>


    </div>
  );
}


export default AdminConfigs
