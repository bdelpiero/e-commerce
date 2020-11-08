const express = require("express");
const router = express.Router();

const { Review, User, Product } = require("../db/models");

router.get("/", (req, res, next) => {
  Review.findAll().then((reviews) => res.send(reviews));
});

router.get("/:productId", (req, res, next) => {
  Review.findAll({
    where: { productId: req.params.productId },
    include: User,
  }).then((reviews) => res.send(reviews));
});

router.post("/:productId", (req, res, next) => {
  // validación que tendría que ir en un middleware
  //if (!req.user) return res.sendStatus(400);

  const { rating, comment } = req.body;
  // const userId = req.user.id;
  const userId = req.user.id;
  const { productId } = req.params;
  console.log(userId);
  console.log(productId);

  return Review.create({ rating, comment, userId, productId })
    .then((review) => {
      return Review.findOne({
        where: { id: review.id },
        include: User,
      });
    })
    .then((review) => res.send(review));
});

module.exports = router;
