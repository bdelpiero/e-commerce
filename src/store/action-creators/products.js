import axios from "axios";
import {RECEIVE_PRODUCTS, RECEIVE_PRODUCT, ADD_TO_PRODUCTS} from "../constant"

const reciveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products,
})


export const fetchProducts = () => dispatch =>
    axios.get('http://localhost:1337/api/products')
        .then(res => res.data)
        .then(products => dispatch(reciveProducts(products)))

// export const fetchMovie = (movieID) => dispatch =>
//     axios.get(`https://www.omdbapi.com/?apikey=20dac387&i=${movieID}&plot=full`)
//         .then(res => res.data)
//         .then(movie => dispatch(reciveMovie(movie)))