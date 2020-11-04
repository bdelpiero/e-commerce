const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const productsRouter = require("./products");
const categoryRouter = require("./categories");


router.use("/user", userRoutes);


router.use("/products", productsRouter);
router.use("/categories", categoryRouter);
module.exports = router;
