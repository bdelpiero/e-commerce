import {IS_LOGGED, LOGIN} from "../constant"
import axios from 'axios'
axios.default.withCredentials= true

/*const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};*/

const loggUser = user =>({
     type: IS_LOGGED,
  payload: user
})

const login = boolean => ({
     type: LOGIN,
  payload: boolean
})


 const fetchIsLogged = () => dispatch =>{
   return axios.get("http://localhost:1337/api/user/verificate")
               .then(res => res.data)
               .then((user) => dispatch(loggUser(user)))
 }

 const fetchLogin = (email,password) =>dispatch=>{
  return axios.post("http://localhost:1337/api/user/login",{
    email,
    password
  })
  .then(res=> res.data)
  .then((user)=> dispatch(loggUser(user)))
}

export { fetchLogin, fetchIsLogged, loggUser,login  }
