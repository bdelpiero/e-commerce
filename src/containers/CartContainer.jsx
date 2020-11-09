import Cart from "../components/Cart";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartProducts, fetchCart } from "../store/action-creators/cart";

// const productsInCart = {

// }

function CartContainer() {
  const cart = useSelector((state) => {
    return state.cart.selected;
  });
  const productsInCart = useSelector((state) => {
    return state.cart.productsInCart;
  });
  const user = useSelector((state) => state.login.loggedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("cart: ", cart);
    // console.log("user: ", user.id);
    dispatch(fetchCart(user));
  }, []);
  useEffect(() => {
    if (cart.id) {
      // console.log("pasó");
      // console.log("cart en dispatch");
      dispatch(fetchCartProducts(cart));
    }
  }, [cart]);

  return (
    <div>
      <Cart productsInCart={productsInCart} />
    </div>
  );
}

export default CartContainer;
