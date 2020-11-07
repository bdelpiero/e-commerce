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
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);
  useEffect(() => {
    // pedido axios para buscar las reviews
    // setearlas en el estado local (setReviews)
    if (!productId) return;
    axios
      .get(`http://localhost:1337/api/reviews/${productId}`)
      .then((res) => res.data)
      .then((reviews) => {
        setReviews(reviews);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <SingleProduct product={product} reviews={reviews} />
    </div>
  );
}

export default ProductContainer;
