import axios from "axios";
import {RECEIVE_PRODUCTS, RECEIVE_PRODUCT, ADD_TO_PRODUCTS} from "../constant"

const reciveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products,
})

const reciveProduct = product => ({
    type: RECEIVE_PRODUCT,
    product,
})

export const fetchProducts = () => dispatch =>
    axios.get('http://localhost:1337/api/products')
        .then(res => res.data)
        .then(products => dispatch(reciveProducts(products)))

export const fetchProduct = (productID) => dispatch =>
    axios.get(`http://localhost:1337/api/products/${productID}`)
        .then(res => res.data)
        .then(product => dispatch(reciveProduct(product)))

export const searchProduct = (search) => dispatch => 
 axios
      .get("http://localhost:1337/api/products", {
        params: { searchTerm: search },
      })
      .then((res) => res.data)
     .then(product => dispatch(reciveProducts(product)))
      .catch((err) => console.log(err));
    