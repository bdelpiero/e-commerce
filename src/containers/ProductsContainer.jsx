import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { fetchProducts } from "../store/action-creators/products";

function ProductsContainer() {
  // const products = useSelector((state) => {
  //   return state.products.list;
  // });
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  //se puede sacar el fetch products y pasarlos desde main
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, []);
  useEffect(() => {
    // pedido axios para buscar las reviews
    // setearlas en el estado local (setReviews)

    axios
      .get("http://localhost:1337/api/reviews/")
      .then((res) => res.data)
      .then((reviews) => {
        setReviews(reviews);
      })
      .catch((err) => console.log(err));
  }, []);

  // const location = useLocation();

  React.useEffect(() => {
    // console.log(location);
    // const path = location.search;
    // const query = new URLSearchParams(path);
    // console.log("busqueda ", query.get("search"));
    console.log(("page: ", page));
    const data = axios
      .get(`http://localhost:1337/api/products/page/${page}`)
      .then((res) => res.data)
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <div>
      <Sidebar
        products={products}
        reviews={reviews}
        page={page}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductsContainer;
