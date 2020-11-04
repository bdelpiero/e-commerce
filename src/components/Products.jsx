import React from "react";
import { Link } from "react-router-dom";

function Products({ products }) {
  return (
    <div>
      {products &&
        products.map((product) => (
          <div key={product.id}>
           
            <Link to={`/products/${product.id}`}><img src={product.imageUrl} style={{height:"300px"}}></img></Link>
          </div>
        ))}
    </div>
  );
}

export default Products;
