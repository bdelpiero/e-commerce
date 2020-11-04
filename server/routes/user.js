const express = require("express");
const passport = require("passport");
const User = require("../db/models/user");
const router = express.Router();

router.post("/register", (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((data) => {
    if (data) {
      return res.sendStatus(400);
    }

    User.create(req.body).then(() => {
      res.sendStatus(201);
    });
  });
});
router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.send(req.user);
});

module.exports = router;
