import React from "react"
import {Link} from "react-router-dom"


function Products({products}) {
    
  return (
    <div>
      {products && products.map(product => (
        <div key={product.id}> {product.title} </div>
      ))}
    </div>
  );
}

export default Products;
