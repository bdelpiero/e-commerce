import React, { useEffect, useState } from "react";
// import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/action-creators/products";

import SingleProduct from "../components/SingleProduct";
import axios from "axios";

function ProductContainer() {
  const { productId } = useParams();
  const product = useSelector((state) => {
    return state.products.selected;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  return (
    <div>
      <SingleProduct product={product} />
    </div>
  );
}

export default ProductContainer;
