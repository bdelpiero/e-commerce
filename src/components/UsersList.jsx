import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    position:'fixed',
    bottom:"10%",
    right: "39%",
    backgroundColor: theme.palette.background.paper,
  },
  position:{
 position: "fixed",
 bottom: "50%",
 right:"50%",
 fontWeight:"bold"
},
toLower:{
  textTransform: "lowercase"
}
}));




export default function VirtualizedList({users}) {
  const classes = useStyles();
  let count = 0
  function renderRow(props) {

    const { index, style } = props;
    count++

    return (
      <div>
      {users.map((user,i)=>(
        count == users.length?
    <ListItem button key={i}>
      <ListItemText primary={`${i+1} | ${user.email} | ${user.rol}`} />
    </ListItem>
    :null
  ))}
  </div>
  )

  }

  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };


  return (
    <div >
    <Typography variant="h6" className={classes.position}>Usuarios</Typography>
    <div className={classes.root}>
      <FixedSizeList height={400} width={300} itemSize={46} itemCount={users.length}>
        {renderRow}
      </FixedSizeList>
      </div>
    </div>
  );
}
