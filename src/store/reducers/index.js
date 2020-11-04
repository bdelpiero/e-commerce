import { combineReducers } from "redux";
import loginReducer from "./loginReducer"
export default combineReducers({
  // movies: moviesReducer,
     login: loginReducer
  // favs: favsReducer,
});
