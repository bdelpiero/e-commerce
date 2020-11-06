const express = require("express");
const router = express.Router();

const { Product, Order } = require("../db/models");

// http://localhost:1337/api/orders    //  POST
router.post("/", (req, res, next) => {
  Order.create(req.body)
    .then((order) => res.send(order))
    .catch((err) => next(err));
});

// busca todos los productos asociados a una orden
//http://localhost:1337/api/orders/:orderId   // GET
router.get("/:orderId", (req, res, next) => {
  Order.findByPk(req.params.orderId)
    .then((order) => {
      return order.getProducts();
    })
    .then((products) => res.send(products))
    .catch((err) => next(err));
});

// http://localhost:1337/api/orders/user  // PUT (REGISTER)
router.get("/user/:userId", (req, res, next) => {
  // const userId = req.user.id
  const { userId } = req.params;
  // const { orderId } = req.body;
  Order.findOrCreate({
    where: {
      userId,
      status: "Pendiente",
      paymentMethod: "Efectivo",
      shippingAdress: "cualquiera",
    },
  }).then((order) => res.send(order[0]));
  // Order.findByPk(orderId)
  //   .then((order) => {
  //     return order.setUser(userId);
  //   })
  //   .then((order) => res.send(order));
});

// http://localhost:1337/api/orders/user //  GET (LOGIN)
// router.get("/user", (req, res, next) => {
//   // const userId = req.user.id
//   console.log("aca");
//   const { userId } = req.body;
//   Order.findOne({
//     where: { userId: userId, status: "Pendiente" },
//   }).then((order) => res.send(order));
// });

// POST  (tiene que recibir producto)
router.post("/:productId", (req, res, next) => {
  const { userId } = req.body;
  const { productId } = req.params;
  Order.findOrCreate({
    where: {
      userId,
      status: "Pendiente",
      paymentMethod: "Efectivo",
      shippingAdress: "cualquiera",
    },
  })
    .then((order) => {
      const product = Product.findByPk(productId);
      return product.then((product) => {
        product.addOrder(order[0].id);
        return order[0];
      });
    })
    .then((order) => {
      res.send(order);
    });
});

module.exports = router;
