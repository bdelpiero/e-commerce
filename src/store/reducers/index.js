import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import completedOrdersReducer from "./completedOrdersReducer";

export default combineReducers({
  products: productsReducer,
  login: loginReducer,
  cart: cartReducer,
  orders: completedOrdersReducer,
  // users: usersReducer,
  // favs: favsReducer,
});
