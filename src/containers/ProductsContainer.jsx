import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";
import axios from "axios";

import { fetchProducts } from "../store/action-creators/products";

function ProductsContainer() {
  const products = useSelector((state) => {
    return state.products.list;
  });
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(() => {
    // pedido axios para buscar las reviews
    // setearlas en el estado local (setReviews)
    console.log("aca");
    axios
      .get("http://localhost:1337/api/reviews/")
      .then((res) => res.data)
      .then((reviews) => {
        setReviews(reviews);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* <Products products={products} /> */}
      <Sidebar products={products} reviews={reviews} />
    </div>
  );
}

export default ProductsContainer;
