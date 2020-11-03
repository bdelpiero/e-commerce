const express = require("express");
const router = express.Router();

const {Category} = require("../db/models");


router.post("/", (req, res, next)=>{
    Category.create(req.body)
        .then(()=> res.sendStatus(201))
});

module.exports = router