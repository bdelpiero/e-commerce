const express = require("express");
const router = express.Router();

const productsRouter = require("./products");
const categoryRouter = require("./categories");
const userRoutes = require("./user");
const ordersRouter = require("./orders");
const reviewsRouter = require("./reviews");

router.use("/user", userRoutes);
router.use("/products", productsRouter);
router.use("/categories", categoryRouter);
router.use("/orders", ordersRouter);
router.use("/reviews", reviewsRouter);

module.exports = router;
