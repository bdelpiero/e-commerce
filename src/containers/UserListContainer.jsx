import React, { useEffect, useState } from "react";
import UsersList from '../components/UsersList'
import axios from 'axios'

function UserListContainer(){
  const [users, setUsers] = useState([])

useEffect(()=>{
  axios.get('http://localhost:1337/api/user')
  .then(res => res.data)
  .then(data => setUsers(data))
  .then(()=> console.log(users))
},[])

  return(
      <UsersList users={users}/>
  )

}

export default UserListContainer
