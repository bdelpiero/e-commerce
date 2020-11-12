import React, { useState, useEffect } from "react";
import AdminConfigs from "../components/AdminConfigs";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
axios.defaults.withCredentials = true;

function AdminConfigsContainer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/user/me")
      .then((res) => res.data)
      .then((user) => {
        // console.log("user desde el back: ", user);
        if (!user.rol || user.rol !== "admin") history.push("/");
      })
      .catch(() => history.push("/"));
  });
  useEffect(() => {
    // console.log("user en admin: ", user);
    // if (!user.rol || user.rol !== "admin") history.push("/");
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
