const express = require("express");
const router = express.Router();
let userRoutes = require("./user");

<<<<<<< HEAD
router.use("/user", userRoutes);
=======
const productsRouter = require("./products")
const categoryRouter = require("./categories")

router.use("/products", productsRouter);
router.use("/categories", categoryRouter);

>>>>>>> 15c08c7d21bbdfb4e6baba82d95fb4b1ea2a1026

module.exports = router;
