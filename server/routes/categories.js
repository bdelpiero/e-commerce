const { DataUsageOutlined } = require("@material-ui/icons");
const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();
const { Category, Product } = require("../db/models");
const Op = Sequelize.Op;
const { Category } = require("../db/models");

router.post("/", (req, res, next) => {
  Category.findOne({
    where: {
      name: req.body.name,
    },
  }).then((category) => {
    if (category && category.name == req.body.name) {
      category.destroy();
      res.status(201).send("");
    } else {
      Category.create(req.body).then((category) =>
        res.status(201).send(category)
      );
    }
  });

  router.get("/:id", (req, res, next) => {
    Product.findAll({
      include: [
        {
          model: Category,
          where: {
            id: req.params.id,
          },
        },
      ],
    }).then((data) => res.send(data));
  });
});

router.get("/", (req, res) => {
  Category.findAll().then((data) => res.send(data));
});

module.exports = router;
