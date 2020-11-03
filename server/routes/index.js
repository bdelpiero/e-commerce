const express = require("express");
const router = express.Router();

const productsRouter = require("./products")
const categoryRouter = require("./categories")

router.use("/products", productsRouter);
router.use("/categories", categoryRouter);


module.exports = router;
