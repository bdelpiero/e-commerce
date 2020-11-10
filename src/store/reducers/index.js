import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  products: productsReducer,
  login: loginReducer,
  cart: cartReducer,
  // users: usersReducer,
  // favs: favsReducer,
});
