import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import categoriesReducer from './categoriesReducer'

export default combineReducers({
  products: productsReducer,
  login: loginReducer,
  cart: cartReducer,
  categories: categoriesReducer,
  // users: usersReducer,
  // favs: favsReducer,
});
