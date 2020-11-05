import { SET_PRODUCT, GET_PRODUCT } from "../constant";
import axios from "axios";

const getProd = (product) => ({
  type: GET_PRODUCT,
  product,
});

export const fetchProduct = (user) => (dispatch) => {
  return axios
    .get(`http://localhost:1337/api/user/cart/${user.id}`)
    .then((res) => res.data)
    .then((product) => dispatch(getProd(product)));
};
