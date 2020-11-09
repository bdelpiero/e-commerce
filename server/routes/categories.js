const express = require("express");
const router = express.Router();

const {Category} = require("../db/models");


router.post("/", (req, res, next)=>{
  console.log(req.body);
    Category.create(req.body)
        .then(()=> res.sendStatus(201))

});

router.get("/", (req,res)=>{
  Category.findAll()
          .then(data => res.send(data))
})

module.exports = router
