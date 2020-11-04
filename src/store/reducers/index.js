import { combineReducers } from "redux";
import loginReducer from "./loginReducer"
import productsReducer from "./productsReducer"

export default combineReducers({
  products: productsReducer,
      login: loginReducer
  // users: usersReducer,
  // favs: favsReducer,
});
