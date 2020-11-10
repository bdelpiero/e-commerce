import React, { useEffect, useState } from "react";
// import {Link} from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/action-creators/products";
import Products from "../components/Products"

import SingleProduct from "../components/SingleProduct";
import axios from "axios";

function ResultsProductContainer({search}) {
  const user = useSelector((state) => state.login.loggedUser);
  const [reviews, setReviews] = useState([]);
  // console.log("los prods", product)
  return (
    <div>
        <h1>resultados de busqueda!</h1>
      <Products products={search} reviews={reviews}
      />
    </div>
  );
}

export default ResultsProductContainer;
