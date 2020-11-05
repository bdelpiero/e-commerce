const express = require("express");
const router = express.Router();

const { Product, Order } = require("../db/models");

router.post("/:id/:productId", (req, res, next) => {
  Order.findByPk(req.params.id)
    .then((order) => {
      const product = Product.findByPk(req.params.productId);
      return product.then((product) => {
        product.addOrder(order);
      });
    })
    .then(() => {
      res.sendStatus(200);
    });
});

module.exports = router;
