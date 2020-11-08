import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import { addProductToCart } from "../store/action-creators/cart";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    height: 200,
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
}));

const reviewsAvg = (reviews, product) => {
  if (reviews.length == 0) return 0;

  return reviews
    .filter((review) => review.productId == product.id)
    .reduce((avg, current, _, array) => {
      return avg + current.rating / array.length;
    }, 0);
};

function Products({ products, reviews }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.loggedUser);
  const [spacing, setSpacing] = useState(5);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  // console.log("reviews: ", reviews);

  return (
    <Grid item xs={12} style={{ marginTop: "50px" }}>
      <Grid container justify='center' spacing={spacing}>
        {products &&
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
              <CardContent>
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
                  <button
                    onClick={() => dispatch(addProductToCart(product, user))}>
                    <AddShoppingCartIcon />
                  </button>
                </Badge>
              </CardContent>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default Products;
