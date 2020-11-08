import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/Login";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogin, loggUser, login } from "../store/action-creators/login";

function LoginContainer() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const name = e.target.name;
    if (name == "email") setEmail(e.target.value);
    if (name == "password") setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login attempt...");
    setIncorrect(false);
    setLoading(true);

    dispatch(fetchLogin(email, password))
      // .then(()=> dispatch(login(true)))
      .then(() => history.push("/"))
      .catch((err) => {
        // console.log(err);
        setIncorrect(true);
        setLoading(false);
      });
  };

  return (
    <Login
      loading={loading}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      incorrect={incorrect}
    />
  );
}

export default LoginContainer;
