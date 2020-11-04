const express = require("express");
const router = express.Router();
const productsRouter = require("./products");
const categoryRouter = require("./categories");
const userRoutes = require("./user");

router.use("/user", userRoutes);
router.use("/products", productsRouter);
router.use("/categories", categoryRouter);

module.exports = router;
