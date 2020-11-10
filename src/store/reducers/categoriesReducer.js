import {COUNT} from "../constant";

const initialState = {
  count: 0
}

export default (state = initialState, { type, payload}) => {
  switch (type) {
    case COUNT:
      return {...state, count:payload}
    default:
  return state
  }
}
