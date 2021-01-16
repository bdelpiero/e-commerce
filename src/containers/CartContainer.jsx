import Cart from "../components/Cart";
import NotLogedCart from "../components/NotLogedCart";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartProducts,
  fetchCart,
  getProds,
  showCompletedOrders,
  setTotal,
  fetchProductsCompletedOrder,
} from "../store/action-creators/cart";
import { useHistory } from "react-router-dom";

function localProducts() {
  let productsArray = [];
  for (const key in localStorage) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      if (!value.price) return;
      productsArray.push(value);
    } catch (e) {
      console.log("error catched while parsing");
    }
  }
  return productsArray;
}
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

  const history = useHistory();

  const checkoutOrder = (total) => {
    dispatch(setTotal(total));
    dispatch(fetchProductsCompletedOrder(cart)).then(() =>
      history.push("/checkout")
    );
  };
  // const showCompletedHandler = () => {
  //   dispatch(showCompletedOrders());
  // };

  useEffect(() => {
    // si no hay usuario logeado. Habría que corregirlo cuando podamos
    // guardar en el localStorage
    if (!user.id) return;
    dispatch(fetchCart(user));
  }, [user]);
  useEffect(() => {
    // si no hay usuario logeado. Habría que corregirlo cuando podamos
    // guardar en el localStorage
    // dispatch(getProds([]))

    if (!user.id) return dispatch(getProds(localProducts()));
    if (cart.id) {
      dispatch(fetchCartProducts(cart));
    }
  }, [cart]);

  return (
    <div>
      {user.id ? (
        <Cart
          productsInCart={productsInCart}
          cart={cart}
          // showCompletedHandler={showCompletedHandler}
          checkoutOrder={checkoutOrder}
        />
      ) : (
        <NotLogedCart
          productsInCart={productsInCart}
          localProducts={localProducts}
        />
      )}
    </div>
  );
}

export default CartContainer;
