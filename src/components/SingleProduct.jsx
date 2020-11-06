import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Image from 'material-ui-image'
import "../styles/singleProductStyle.css";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { addProductToCart } from "../store/action-creators/cart";

function SingleProduct({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.loggedUser);
  return (
    <div className='container'>
      <div className='imgDiv'>
        <img className='imgSize' src={product.imageUrl} />
      </div>
      <div className='textDiv'>
        <h1>Titulo: {product.title}</h1>
        <h2>Autor: {product.author}</h2>
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

export default SingleProduct;

{
  /* <div>
<div>
    
</div>
<div>
    <h1>{product.title}</h1>
    <h2>{product.author}</h2>
    <h3>{product.description}</h3>
    <h3>{product.price}</h3>
    <p>{product.stock}</p>
</div>
</div> */
}

{
  /* <Link to="/user/cart/6">
                    <AddShoppingCartIcon />
                  </Link>

<IconButton aria-label="show 4 new mails" color="inherit">
<Badge badgeContent={4} color="secondary">
  <Link to="/user/cart/6">
    <AddShoppingCartIcon />
  </Link>
</Badge>
</IconButton> */
}
