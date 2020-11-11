import { SET_COMPLETED_ORDER, GET_PRODUCTS_COMPLETED_ORDER, SET_TOTAL } from "../constant";

const initialState = {
  completedOrders: [],
  completedOrdersProduct: [],
  total: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPLETED_ORDER:
      return { ...state, completedOrders: action.orders };
    case GET_PRODUCTS_COMPLETED_ORDER:
      return { ...state, completedOrdersProduct: action.products };
    case SET_TOTAL:
      return {...state, total:action.total}
    default:
      return state;
  }
};
