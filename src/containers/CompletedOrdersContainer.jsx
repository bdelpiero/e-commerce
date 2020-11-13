import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsCompletedOrder,
  showCompletedOrders,
} from "../store/action-creators/cart";
import CompletedOrders from "../components/CompletedOrders";

function CompletedOrderContainer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.loggedUser);
  const completedOrders = useSelector((state) => {
    // console.log("ACA ESTA EL ESTADO", state);
    return state.orders.completedOrders;
  });
  const state = useSelector((state) => {
    return state;
  });
  const handleClick = (orden) => {
    dispatch(fetchProductsCompletedOrder(orden));
    // console.log("ACA ESTA EL STATE de CLICK", state);
  };

  useEffect(() => {
    dispatch(showCompletedOrders());
  }, []);

  return (
    <div>
      <CompletedOrders
        completedOrders={completedOrders}
        handleClick={handleClick}
      />
    </div>
  );
}

export default CompletedOrderContainer;
