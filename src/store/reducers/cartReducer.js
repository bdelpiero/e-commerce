import { GET_PRODUCTS, SET_PRODUCT, SET_CART, GET_CART } from "../constant";

const initialState = {
  // list : [],
  selected: {},
  productsInCart: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, productsInCart: action.products };
    case SET_PRODUCT:
      return {
        ...state,
        productsInCart: [...state.productsInCart, action.product],
      };
    case SET_CART:
      // console.log("en el reducer: ", action.cart);
      return { ...state, selected: action.cart };
    // case GET_CART:
    //   return { ...state, selected: action.cart };
    default:
      return state;
  }
};
