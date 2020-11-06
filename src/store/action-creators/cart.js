import { GET_PRODUCTS, SET_PRODUCT, SET_CART, GET_CART } from "../constant";
import axios from "axios";

const getProds = (products) => ({
  type: GET_PRODUCTS,
  products,
});

// Products.jsx y Product.jsx
const setProd = (product) => ({
  type: SET_PRODUCT,
  product,
});

const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const fetchCartProducts = (cart) => (dispatch) => {
  console.log("cart en fetch: ", cart);
  if (!cart.id) return;
  return axios
    .get(`http://localhost:1337/api/orders/${cart.id}`)
    .then((res) => res.data)
    .then((products) => dispatch(getProds(products)));
};

// ver ruta
export const addProductToCart = (product, user) => (dispatch) => {
  console.log(user);
  return axios
    .post(`http://localhost:1337/api/orders/${product.id}`, { userId: user.id })
    .then((res) => res.data)
    .then((cart) => dispatch(setCart(cart)))
    .catch((err) => console.log(err));
};
export const delProductFromCart = (product, user, cart) => (dispatch) => {
  console.log("ACA ESTA EL USER", user);
  return axios
    .delete(`http://localhost:1337/api/orders/${user.id}/${product.id}`)
    .then(() => fetchCartProducts(cart)) // HACER FETCH CART DE NUEVO
    .catch((err) => console.log(err));
};

export const fetchCart = (user) => (dispatch) => {
  console.log(("user en axios: ", user));
  if (!user) return;

  return axios
    .get(`http://localhost:1337/api/orders/user/${user.id}`)
    .then((res) => res.data)
    .then((cart) => {
      console.log("carrito actualizado: ", cart);
      return dispatch(setCart(cart));
    });
};

export const createCart = () => (dispatch) => {
  return axios
    .post(`http://localhost:1337/api/orders`, {
      paymentMethod: "Efectivo",
      shippingAdress: "hola",
    })
    .then((res) => res.data)
    .then((cart) => dispatch(setCart(cart)));
};

// http://localhost:1337/api/orders/user  // POST (REGISTER)
export const addCartToUser = (user) => (dispatch) => {
  return axios
    .put(`http://localhost:1337/api/orders/user`, { user })
    .then((res) => res.data)
    .then((cart) => dispatch(setCart(cart)));
};
