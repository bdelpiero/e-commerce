import { SET_COMPLETED_ORDER, GET_PRODUCTS_COMPLETED_ORDER } from "../constant";

const initialState = {
  completedOrders: [],
  completedOrdersProduct: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPLETED_ORDER:
      return { ...state, completedOrders: action.orders };
    case GET_PRODUCTS_COMPLETED_ORDER:
      return { ...state, completedOrdersProduct: action.products };
    default:
      return state;
  }
};
