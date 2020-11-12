import React from "react";
import { Link, useLocation, Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import  Button  from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Products from "./Products";
import axios from "axios"


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: -1,
    position: "zIndex",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
    // width: drawerWidth,
    flexShrink: 0,
 
    position: "zIndex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

export default function Sidebar({reviews, search}) {

  const classes = useStyles();

   const [categories, setCategories] = React.useState([]);
  

   const [products, setProducts ] = React.useState([]);



   const [productsByCategory, setProductsByCategory] = React.useState([]);
 
const categoriesHandler = (id) => {
  console.log("hice click :)", id)
  axios
    .get(`http://localhost:1337/api/categories/${id}`)
    .then((res) => res.data)
    .then((data) => setProductsByCategory(data));
   
}
 
 React.useEffect(() => {
   axios
     .get("http://localhost:1337/api/categories")
     .then((res) => res.data)
     .then((data) => setCategories(data))
     .then((data) => console.log(data));
 }, []);

const location = useLocation();

React.useEffect(() => {
  console.log(location);
  const path = location.search;
  const query = new URLSearchParams(path);
  console.log("busqueda ", query.get("search"));
  const data = axios
    .get("http://localhost:1337/api/products", {
      params: { searchTerm: query.get("search") },
    })
    .then((res) => res.data)
    .then((products) => {
      setProducts(products);
    })
    .catch((err) => console.log(err));
}, []);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem>
            <ListItemText primary={"Categories"} />
          </ListItem>
        </List>
        <Divider />
        <div className={classes.list}>
          {categories.map((categories) => {
            return (
              <div>
                <Link to={"/categories"}>
                  <Button onClick={() => categoriesHandler(categories.id)}>
                    {categories.name}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <main className={classes.content}>
        <Route
          exact
          path="/"
          render={() => <Products products={products} reviews={reviews} />}
        />
        <Route
          exact
          path="/categories"
          render={() => (
            <Products products={productsByCategory} reviews={reviews} />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Products products={search} reviews={reviews} />
          )}
        />
      </main>
    </div>
  );
}
 