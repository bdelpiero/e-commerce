const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
const Op = Sequelize.Op;
const { Product, Category } = require("../db/models");

// router.get("/", (req, res, next) => {
//   console.log("holssss", req.query);
//   if (Object.keys(req.query).length !== 0) {
//     const filter = {
//       title: { [Op.iLike]: `%${req.query.searchTerm}%` },
//     };
//     Product.findAll({ where: filter, include: Category }).then((filtered) =>
//       res.send(filtered)
//     );
//   } else {
//     Product.findAll({ include: Category }).then((products) =>
//       res.send(products)
//     );
//   }
// });

router.get("/", (req, res, next) => {
  if (Object.keys(req.query).length !== 0) {
    Product.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${req.query.searchTerm}%` } },
          { author: { [Op.iLike]: `%${req.query.searchTerm}%` } },
          { "$categories.name$": { [Op.iLike]: `%${req.query.searchTerm}%` } },
        ],
      },
      include: [{ model: Category, as: "categories" }],
    }).then((filtered) => res.send(filtered));
  } else {
    Product.findAll({ include: { model: Category } }).then((products) =>
      res.send(products)
    );
  }
});

// where: {
//   '$Instruments.size$': { [Op.ne]: 'small' }
// },
// include: [{
//   model: Tool,
//   as: 'Instruments'
// }]

router.get("/total", (req, res, next) => {
  Product.count()
    .then((total) => res.status(200).send("" + total))
    .catch((err) => console.log(err));
});

router.get("/page/:pageNumber", (req, res, next) => {
  // console.log("req params: ", req.params.pageNumber);
  const range = [
    req.params.pageNumber * 8 - 8 + (req.params.pageNumber - 1),
    req.params.pageNumber * 8 + (req.params.pageNumber - 1),
  ];
  // console.log("range: ", range);
  Product.findAll({
    where: { id: { [Op.between]: range } },
  }).then((products) => res.send(products));
});

// router.get("/", (req, res, next) => {
//   Product.findAll().then((products) => res.send(products));
// });

router.get("/:productId", (req, res, next) => {
  Product.findByPk(req.params.productId, { include: Category })
    .then((product) => res.send(product))
    .catch((err) => console.log(err));
});

//Revisar la relacion con categories para cuando setiemos mas de una categoria
router.post("/", (req, res, next) => {
  const product = Product.create(req.body);
  const category = Category.findOne({ where: { name: req.body.category } });

  Promise.all([product, category])
    .then(([product, category]) => product.addCategory(category))
    .then(() => res.sendStatus(201));
});

router.put("/:productId", (req, res, next) => {
  Product.update(req.body, {
    where: { id: req.params.productId },
  })
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.delete("/:productId", (req, res, next) => {
  Product.destroy({ where: { id: req.params.productId } }).then(() =>
    res.sendStatus(200)
  );
});

module.exports = router;
