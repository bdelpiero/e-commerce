import React, { useState, useEffect } from "react";
import AddCategories from "../components/AddCategories";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const getCategories = (setCategories) => {
  return axios
    .get("http://localhost:1337/api/categories")
    .then((res) => res.data)
    .then((data) => setCategories(data))
    .then((da) => console.log(da));
};

function AddCategoriesContainer() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    getCategories(setCategories);
  }, []);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1337/api/categories", {
        name: category,
      })
      .then((res) => res.data)
      .then(() => {
        getCategories(setCategories);
      })
      .then(() => setCategory(""))
      .catch(() => setCategory(""));
  };

  return (
    <AddCategories
      message={message}
      value={category}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      categories={categories}
    />
  );
}

export default AddCategoriesContainer;
