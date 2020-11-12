import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import { addProductToCart } from "../store/action-creators/cart";
import { fetchProducts } from "../store/action-creators/products";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import "../styles/ProductsStyle.css";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paginationRoot: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  control: {
    padding: theme.spacing(5),
  },
  sizes: {
    height: 275,
    width: 200,
  },
  cardroot: {
    maxWidth: 345,
  },
  media: {
    height: 275,
    width: 200,
  },
  cardinfo: {
    height: 50,
  },
  titletypo: {
    fontSize: 20,
    textAlign: "center",
  },
  authortypo: {
    textAlign: "center",
  },
  pricetypo: {
    textAlign: "center",
    marginTop: 7,
    color: "red",
    fontWeight: "bold",
  },
  content: {
    maxWidth: 200,
  },
}));

const reviewsAvg = (reviews, product) => {
  if (reviews.length == 0) return 0;

  return reviews
    .filter((review) => review.productId == product.id)
    .reduce((avg, current, _, array) => {
      return avg + current.rating / array.length;
    }, 0);
};

function Products({ products, reviews, page, handlePageChange }) {
  console.log("LOS PRODUCTOS", products);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.loggedUser);
  const [spacing, setSpacing] = useState(5);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const addToCart = (product) => {
    if (user.id) {
      dispatch(addProductToCart(product, user));
    } else {
      const newProduct = JSON.parse(localStorage.getItem(product.id));
      product.total = newProduct ? newProduct.total + 1 : 1;
      localStorage.setItem(`${product.id}`, JSON.stringify(product));

      axios
        .put(
          `http://localhost:1337/api/orders/newOrder/product/${product.id}`,
          { op: "suma" }
        )
        .then(() => dispatch(fetchProducts()));
    }
  };

  // console.log("reviews: ", reviews);
  //console.log("ESTOS SON LOD PRODS DE BUSQUEDA", products);
  return (
    <Grid item xs={12} style={{ marginTop: "50px" }}>
      <Grid container justify='center' spacing={spacing}>
        {Array.isArray(products) &&
          products.map((product) => (
            <Grid key={product.id} item>
              <Card className={classes.cardroot}>
                <CardActionArea>
                  <Link to={`/products/${product.id}`}>
                    <CardMedia
                      className={classes.media}
                      image={product.imageUrl}
                      title='Contemplative Reptile'
                    />
                  </Link>
                </CardActionArea>
              </Card>
              <CardContent className={classes.content}>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  className={classes.titletypo}>
                  {product.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.authortypo}>
                  <span>by: {product.author}</span>
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.pricetypo}>
                  <span> {product.price}</span>
                </Typography>
                <Box
                  component='fieldset'
                  mb={3}
                  borderColor='transparent'
                  style={{ marginBottom: "0px" }}>
                  <Rating
                    name='read-only'
                    value={reviewsAvg(reviews, product)}
                    readOnly
                  />
                </Box>

                {/* <Badge badgeContent={4} color='secondary'> */}
                <Badge color='secondary'>
                  {/* <Link className='bw' onClick={() => addToCart(product)}> */}
                  <AddShoppingCartIcon onClick={() => addToCart(product)} />
                  {/* </Link> */}
                </Badge>
              </CardContent>
            </Grid>
          ))}
      </Grid>
      <div className={classes.paginationRoot}>
        <Typography>Page: {page}</Typography>
        <Pagination count={4} page={page} onChange={handlePageChange} />
      </div>
    </Grid>
  );
}

export default Products;
