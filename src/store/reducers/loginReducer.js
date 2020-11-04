import {IS_LOGGED} from "../constant"
const initalState = {
  loggedUser:{},
}

export default (state = initalState, {type, payload})=>{
  switch (type) {
    case IS_LOGGED:
       return {...state, loggedUser: payload}
    default:
  return state
  }
}
