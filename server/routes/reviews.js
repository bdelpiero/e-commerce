const express = require("express");
const router = express.Router();

const { Review } = require("../db/models");

router.get("/", (req, res, next) => {
  Review.findAll().then((reviews) => res.send(reviews));
});

router.post("/:productId", (req, res, next) => {
  // validación que tendría que ir en un middleware
  //if (!req.user) return res.sendStatus(400);

  const { rating, comment } = req.body;
  // const userId = req.user.id;
  const { userId } = req.body;
  const { productId } = req.params;

  Review.create({ rating, comment, userId, productId }).then(() =>
    res.sendStatus(201)
  );
});

module.exports = router;
