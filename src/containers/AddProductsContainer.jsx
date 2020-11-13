import React, { useState, useEffect } from "react";
import AddProducts from "../components/AddProducts";
import axios from "axios";

function AddProductsContainer() {
  const [title, setTitle] = useState("");
  const [author, setAuthoer] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/categories`)
      .then((res) => res.data)
      .then((categoriesFromBack) => setCategories(categoriesFromBack))
      .catch(() => setCategories([]));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    if (name == "title") setTitle(e.target.value);
    if (name == "author") setAuthoer(e.target.value);
    if (name == "isbn") setIsbn(e.target.value);
    if (name == "publisher") setPublisher(e.target.value);
    if (name == "description") setDescription(e.target.value);
    if (name == "imageUrl") setImageUrl(e.target.value);
    if (name == "stock") setStock(e.target.value);
    if (name == "price") setAmount(e.target.value);
    if (name == "category") setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit attempt");
    axios
      .post("http://localhost:1337/api/products", {
        title: title,
        price: amount,
        description: description,
        stock: stock,
        imageUrl: imageUrl,
        ISBN: isbn,
        author: author,
        publisher: publisher,
        category: category,
      })
      .then((res) => res.data)
      .then(() => {
        setTitle("");
        setAuthoer("");
        setIsbn("");
        setPublisher("");
        setDescription("");
        setImageUrl("");
        setStock("");
        setAmount("");
        setCategory("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <AddProducts
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      handleOpen={handleOpen}
      category={category}
      categories={categories}
    />
  );
}

export default AddProductsContainer;
