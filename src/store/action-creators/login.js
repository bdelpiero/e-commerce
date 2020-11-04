import {IS_LOGGED} from "../constant"
import axios from 'axios'

 const loggUser = user =>({
     type: IS_LOGGED,
  payload: user
})

export const fetchLogin = (email,password) =>dispatch=>{
  return axios.post("http://localhost:1337/api/user/login",{
    email,
    password
  })
  .then(res=> res.data)
  .then((user)=> dispatch(loggUser(user)))
}
