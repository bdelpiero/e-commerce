import Cart from "../components/Cart";
import NotLogedCart from "../components/NotLogedCart";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartProducts,
  fetchCart,
  getProds,
  showCompletedOrders,
  completeOrder,
} from "../store/action-creators/cart";

function localProducts() {
  let productsArray = [];
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      productsArray.push(JSON.parse(localStorage.getItem(key)));
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

  const completeOrderHandler = (order) => {
    dispatch(completeOrder(order));
  };
  const showCompletedHandler = () => {
    dispatch(showCompletedOrders());
  };

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
          showCompletedHandler={showCompletedHandler}
          completeOrderHandler={completeOrderHandler}
        />
      ) : (
        <NotLogedCart productsInCart={productsInCart} />
      )}
    </div>
  );
}

export default CartContainer;
