import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CompletedOrderDetails from "../components/CompletedOrderDetails";
import { showCompletedOrders } from "../store/action-creators/cart";
function CompletedOrderDetailsContainer() {
  const dispatch = useDispatch();
  const completedOrdersProduct = useSelector((state) => {
    return state.orders.completedOrdersProduct;
  });
  const showCompletedHandler = () => {
    dispatch(showCompletedOrders());
  };

  return (
    <div>
      <CompletedOrderDetails
        completedOrdersProduct={completedOrdersProduct}
        showCompletedHandler={showCompletedHandler}
      />
    </div>
  );
}

export default CompletedOrderDetailsContainer;
