import { SET_COMPLETED_ORDER } from "../constant";

const initialState = {
  completedOrders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPLETED_ORDER:
      return { ...state, completedOrders: action.orders };
    default:
      return state;
  }
};
