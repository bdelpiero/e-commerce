import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/singleProductStyle.css";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { addProductToCart } from "../store/action-creators/cart";
import { fetchProducts } from "../store/action-creators/products";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import axios from "axios";
// es la misma función que para todos los productos. Tendŕia que estar en /utils
const reviewsAvg = (reviews, product) => {
  if (reviews.length == 0) return 0;

  return reviews
    .filter((review) => review.productId == product.id)
    .reduce((avg, current, _, array) => {
      return avg + current.rating / array.length;
    }, 0);
};

const trimDescription = (description) => {
  if (!description) return;
  if (description.length >= 100) {
    return description.substring(0, 100) + "...";
  }
  return description;
};

function SingleProductInfo({ product, reviews }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.loggedUser);
  const handleRemove = () => {
    axios
      .delete(`http://localhost:1337/api/products/${product.id}`)
      .then((res) => res.data)
      .then(history.push("/"));
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

  return (
    <div className='info-container'>
      <div className='imgDiv'>
        <img className='imgSize' src={product.imageUrl} />
      </div>
      <div className='textDiv'>
        <h1>{product.title}</h1>
        <h3>by {product.author}</h3>
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
        <h4 style={{ maxWidth: 650 }}>
          {trimDescription(product.description)}
        </h4>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <h3>{product.price}</h3>
          <Button
            onClick={() => addToCart(product)}
            variant='contained'
            color='secondary'
            // style={{
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   height: 50,
            //   width: 200,
            // }}
          >
            Add To Cart
            <AddShoppingCartIcon style={{ marginLeft: 5 }} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SingleProductInfo;
