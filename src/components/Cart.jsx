import React from "react";

function Cart({ productsInCart }) {
  console.log("IN CART:", productsInCart);
  return (
    <div>
      {productsInCart.map((product) => {
        return <p>{product.title}</p>;
      })}
    </div>
  );
}

export default Cart;
