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
    marginTop: 60,
    display: "flex",

    ["@media (max-width:700px)"]: {
      // eslint-disable-line no-useless-computed-key
      flexDirection: "column",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: "100%",
    flexShrink: 0,
    zIndex: -1,
    position: "zIndex",
  },
  drawerContainer: {
    paddingTop: 15,
    height: "100vh",
    width: 270,
    minWidth: 250,
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    overflow: "auto",
    // width: drawerWidth,
    flexShrink: 0,

    position: "zIndex",
    position: "fixed",
    ["@media (max-width:700px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "static",
      height: "auto",
    },
  },
  content: {
    marginLeft: 270,
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    ["@media (max-width:700px)"]: {
      marginLeft: "auto",
    },
  },
  list: {
    width: 270,
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 30,
    ["@media (max-width:700px)"]: {
      // eslint-disable-line no-useless-computed-key
      position: "static",
      alignItems: "center",
      paddingLeft: 0,
      width: "auto",
      position: "static",
    },
  },
  category: {
    boxShadow: "0 1px 1px  rgba(0,0,0,0.2)",
    marginBottom: 20,
    width: 270,
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    ["@media (max-width:700px)"]: {
      // width: "98vw",
      boxShadow: "none",
      textAlign: "center",
      paddingLeft: 0,
    },
  },
  item: {
    paddingLeft: 15,
    ["@media (max-width:700px)"]: {
      paddingLeft: 0,
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
        <div className={classes.list}>
          <div className={classes.category}>
            <h3>CATEGORIES</h3>
          </div>
          {categories.map((category) => {
            return (
              <div key={category.id}>
                <Link
                  to={"/categories"}
                  className={classes.item}
                  style={{ textDecoration: "none" }}>
                  <Button
                    onClick={() => categoriesHandler(category.id)}
                    style={{ color: "grey" }}>
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
