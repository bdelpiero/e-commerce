import Cart from "../components/Cart";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartProducts,
  fetchCart,
  getProds,
} from "../store/action-creators/cart";

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

    // si no hay usuario logeado. Habría que corregirlo cuando podamos
    // guardar en el localStorage
    if (!user.id) return;

    dispatch(fetchCart(user));
  }, [user]);
  useEffect(() => {
    // si no hay usuario logeado. Habría que corregirlo cuando podamos
    // guardar en el localStorage
    if (!user.id) return dispatch(getProds([]));

    if (cart.id) {

      console.log("pasó");
      console.log("cart en dispatch", cart);

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
