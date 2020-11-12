const { DataUsageOutlined } = require("@material-ui/icons");
const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();
const Op = Sequelize.Op;

const {Category, Product} = require("../db/models");

router.get("/:id" , (req,res,next) => {  
  Product.findAll({
    include: [{ model:Category,
    where: {
      id: req.params.id ,
    }}]
  }).then((data) => res.send(data));

}) 




// Albums.findAll({   include: [{     model: Artists,     as: 'Singer',     where: { name: 'Al Green' } //   }] })

router.post("/", (req, res, next)=>{
Category.findOne({
  where:{
    name: req.body.name
  }
}).then((category)=>{
  if (category && category.name == req.body.name) {
    category.destroy()
  }
  else{
    Category.create(req.body)
        .then(()=> res.sendStatus(201))
  }
})
});

router.get("/", (req, res) => {
  Category.findAll().then((data) => res.send(data));
});

module.exports = router;
