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
router.post("/logout", function (req, res) {
  req.logout();
  res.status(200).send("Deslogueado correctamente");
});

router.put("/admin", (req, res, next) => {
  if (req.user.rol !== "admin") res.sendStatus(401);
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user && user.rol === "user") {
      user.update({
        rol: "admin",
      });
    } else if (user && user.rol === "admin") {
      user.update({
        rol: "user",
      });
    }
    res.sendStatus(200);
  });
});

module.exports = router;
