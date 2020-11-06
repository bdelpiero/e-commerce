const express = require("express");
const router = express.Router();

const {Product, Category} = require("../db/models");


router.get("/", (req, res, next)=>{
    Product.findAll()
        .then(products => res.send(products));
});

router.get("/:productId", (req, res, next)=>{
    Product.findByPk(req.params.productId)
        .then(product => res.send(product))
        .catch(err=> console.log(err))
});

//Revisar la relacion con categories para cuando setiemos mas de una categoria
router.post("/", (req, res, next)=>{
    const product = Product.create(req.body);
    const category = Category.findOne({where:{name: req.body.category}});

    Promise.all([product, category])
        .then(([product, category])=> product.addCategory(category))
        .then(()=>res.sendStatus(201));
})

router.post("/add",(req,res)=>{
  Product.create(req.body)
         .then((book)=> res.status(201).send(book))
})


router.put("/:productId", (req, res, next)=>{
    Product.update(req.body, {where: {id: req.params.productId}})
        .then(() => res.sendStatus(200));
});

router.delete("/:productId", (req, res, next)=>{
    Product.destroy({where: {id: req.params.productId}})
        .then(() => res.sendStatus(200));
});

module.exports = router
