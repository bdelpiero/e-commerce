import {IS_LOGGED, LOGIN} from "../constant"
const initalState = {
  loggedUser:{},
  logged:false
}

export default (state = initalState, {type, payload})=>{
  switch (type) {
    case IS_LOGGED:
       return {...state, loggedUser: payload}
    case LOGIN:
    return {...state, logged: payload}
    default:
  return state
  }
}
