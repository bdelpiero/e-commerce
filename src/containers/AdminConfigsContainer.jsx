import React, { useState, useEffect } from "react";
import AdminConfigs from "../components/AdminConfigs";
import axios from "axios";

function AdminConfigsContainer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/user")
      .then((res) => res.data)
      .then((data) => setUsers(data))
      .catch((err) => console.log("error del back: ", err));
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user email: ", email);
    console.log("create admin attempt...");
    axios
      .put("http://localhost:1337/api/user/admin", {
        email: email,
      })
      .then((res) => res.data)
      .then(() =>
        axios
          .get("http://localhost:1337/api/user")
          .then((res) => res.data)
          .then((data) => setUsers(data))
          .then(() => console.log(users))
      )
      .catch((err) => console.log(err));
  };

  return (
    <AdminConfigs
      message={message}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      users={users}
    />
  );
}

export default AdminConfigsContainer;
