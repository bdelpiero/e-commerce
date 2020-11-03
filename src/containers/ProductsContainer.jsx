import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Products from "../components/Products"

import {fetchProducts} from "../store/action-creators/products";


function ProductsContainer() {

  const products = useSelector((state)=>{
    return state.products.list
  })

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  return (
    <div>
      <Products products={products}/>
    </div>
  );
}

export default ProductsContainer;
