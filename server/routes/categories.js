const express = require("express");
const router = express.Router();

const {Category} = require("../db/models");


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
