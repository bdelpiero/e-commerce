import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Register from "../components/Register";

function RegisterContainer() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    const name = e.target.name;
    if (name == "username") setUsername(e.target.value);
    if (name == "email") setEmail(e.target.value);
    if (name == "password") setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("register attempt...");
    setIncorrect(false);
    setLoading(true);

    axios
      .post("http://localhost:1337/api/user/register", {
        userName: username,
        email: email,
        password: password,
      })
      .then((res) => res.data)
      .then(() => history.push("/login"))
      .catch((err) => {
        // console.log(err);
        setIncorrect(true);
        setLoading(false);
      });
  };

  return (
    <Register
      loading={loading}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      incorrect={incorrect}
    />
  );
}

export default RegisterContainer;
