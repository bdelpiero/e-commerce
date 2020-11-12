
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { fetchProducts } from "../store/action-creators/products";
import BookCategories from "../components/BookCategories";

function BookCategoriesContainer() {

  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const [productsCategories, setProductsCategories] = useState([]);


  return (
    <div>
      <BookCategories productsCategories={productsCategories} reviews={reviews} />
    </div>
  );
}

export default BookCategoriesContainer;
