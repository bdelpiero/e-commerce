import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import ClassOutlinedIcon from "@material-ui/icons/ClassOutlined";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const useStylsheets = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    position: "fixed",
    bottom: "4%",
    right: "70%",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
function InteractiveList({ categories }) {
  const classes = useStylsheets();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <div className={classes.root}>
      <Typography variant='h6' className={classes.title}>
        Categories
      </Typography>
      <div className={classes.demo}>
        <List dense={dense}>
          {categories &&
            categories.map((category, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar>
                    <ClassOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={category.name}
                  secondary={secondary ? "Secondary text" : null}
                />
              </ListItem>
            ))}
        </List>
      </div>
    </div>
  );
}

export default InteractiveList;
