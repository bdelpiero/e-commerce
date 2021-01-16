import React from "react";
import { Link, useLocation, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
import axios from "axios";
axios.defaults.withCredentials = true;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 20,
    ["@media (max-width:700px)"]: {
      // eslint-disable-line no-useless-computed-key
      flexDirection: "column",
    },
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
    ["@media (max-width:700px)"]: {
      // eslint-disable-line no-useless-computed-key
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 30,
    ["@media (max-width:700px)"]: {
      // eslint-disable-line no-useless-computed-key

      alignItems: "center",
    },
  },
}));

export default function Sidebar({
  reviews,
  page,
  handlePageChange,
  search = [],
}) {
  const classes = useStyles();

  const [categories, setCategories] = React.useState([]);

  const [products, setProducts] = React.useState([]);

  const [productsByCategory, setProductsByCategory] = React.useState([]);
  const [nothingFound, setNothingFound] = React.useState(false);

  const categoriesHandler = (id) => {
    console.log("id: ", id);
    axios
      .get(`http://localhost:1337/api/categories/${id}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => setProductsByCategory(data));
  };

  React.useEffect(() => {
    if (search.length == 0) setNothingFound(true);
    else setNothingFound(false);
  }, [search]);

  React.useEffect(() => {
    axios
      .get("http://localhost:1337/api/categories")
      .then((res) => res.data)
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const location = useLocation();

  React.useEffect(() => {
    const path = location.search;
    const query = new URLSearchParams(path);
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

  React.useEffect(() => {
    const data = axios
      .get(`http://localhost:1337/api/products/page/${page}`)
      .then((res) => res.data)
      .then((products) => {
        // console.log("current products: ", products);
        setProducts(products);
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem>
            <ListItemText primary={"CATEGORIES"} />
          </ListItem>
        </List>
        <Divider />
        <div className={classes.list}>
          {categories.map((category) => {
            return (
              <div key={category.id}>
                <Link to={"/categories"} style={{ textDecoration: "none" }}>
                  <Button onClick={() => categoriesHandler(category.id)}>
                    {category.name}
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
          path='/'
          render={() => (
            <Products
              products={products}
              reviews={reviews}
              page={page}
              handlePageChange={handlePageChange}
              showPage={true}
            />
          )}
        />
        <Route
          exact
          path='/categories'
          render={() => (
            <Products
              products={productsByCategory}
              reviews={reviews}
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        />
        <Route
          exact
          path='/search'
          render={() => (
            <Products
              nothingFound={nothingFound}
              products={search}
              reviews={reviews}
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        />
      </main>
    </div>
  );
}
