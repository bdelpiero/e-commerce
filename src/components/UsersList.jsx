import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    position:'fixed',
    bottom:"15%",
    right: "39%",
    backgroundColor: theme.palette.background.paper,
  },
  position:{
 position: "fixed",
 bottom: "55%",
 right:"50%",
 fontWeight:"bold"
  }
}));




export default function VirtualizedList({users}) {
  const classes = useStyles();
  let count = 0
  function renderRow(props) {
    if(count <= users.length){
    const { index, style } = props;
    count++

    return (

    <div>
      {users.map((user,i)=>(
        count == users.length?
        <ListItemText key={i} primary={`${[i+1]} | ${user.email}`} />
        :null
          ))}
    </div>

    );
   }
  }

  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };


  return (
    <div >
    <p className={classes.position}>Usuarios</p>
    <div className={classes.root}>
      <FixedSizeList height={400} width={300} itemSize={46} itemCount={users.length}>
        {renderRow}
      </FixedSizeList>
      </div>
    </div>
  );
}
