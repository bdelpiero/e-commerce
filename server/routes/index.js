const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const productsRouter = require("./products");
const categoryRouter = require("./categories");
const userRoutes = require("./user");
const ordersRouter = require("./orders");

router.use("/user", userRoutes);
router.use("/products", productsRouter);
router.use("/categories", categoryRouter);
router.use("/orders", ordersRouter);

=======
const userRoutes = require("./user");
const productsRouter = require("./products");
const categoryRouter = require("./categories");


router.use("/user", userRoutes);


router.use("/products", productsRouter);
router.use("/categories", categoryRouter);
>>>>>>> 16ee815469868ff80ecedeb86c41c5853a2e8bc7
module.exports = router;
