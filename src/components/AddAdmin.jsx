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
import UsersListContainer from '../containers/UserListContainer'

 function AddAdmin({handleChange, handleSubmit,message}) {
  const classes = useStyles();

  return (
    <div>

    <div className={classes.center}>
    <p className={classes.p}>Want to add or remove an admin?</p>
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
        <div className={classes.alert}>{message}</div>
        <Button type="submit" className={classes.b} variant="contained" color="secondary">
        create or remove admin
      </Button>
      </FormControl>
      </form>

      </div>
      <UsersListContainer/>
    </div>
  );
}


export default AddAdmin
