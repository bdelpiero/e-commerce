import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import axios from "axios";

function UserListContainer({ users }) {
  return <UsersList users={users} />;
}

export default UserListContainer;
