import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Image from 'material-ui-image'
import "../styles/singleProductStyle.css";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { addProductToCart } from "../store/action-creators/cart";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

// es la misma función que para todos los productos. Tendŕia que estar en /utils
const reviewsAvg = (reviews, product) => {
  if (reviews.length == 0) return 0;

  return reviews
    .filter((review) => review.productId == product.id)
    .reduce((avg, current, _, array) => {
      return avg + current.rating / array.length;
    }, 0);
};

function SingleProductInfo({ product, reviews }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.loggedUser);
  //console.log("reviews en singleProduct: ", reviews);
  return (
    <div className='info-container'>
      <div className='imgDiv'>
        <img className='imgSize' src={product.imageUrl} />
      </div>
      <div className='textDiv'>
        <h1>Titulo: {product.title}</h1>
        <h2>Autor: {product.author}</h2>
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
        <h3>Descripcion: {product.description}</h3>
        <h3>Precio: {product.price}</h3>
        <p>Disponible: {product.stock}</p>

        <AddShoppingCartIcon />
        <button onClick={() => dispatch(addProductToCart(product, user))}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default SingleProductInfo;
