const express = require("express");
const passport = require("passport");
const { findOne } = require("../db/models/user");
const Order = require("../db/models/order");
const User = require("../db/models/user");
const router = express.Router();
const { Op } = require("sequelize");

router.get("/", (req, res) => {
  User.findAll({ order: [["id", "ASC"]] })
    .then((users) => res.send(users))
    .catch(() => res.sendStatus(400));
});

/* -------User Register, Login, LogOut--------- */
router.post("/register", (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((data) => {
    if (data) {
      return res.sendStatus(400);
    }
    User.create(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => res.sendStatus(400));
  });
});
router.post(
  "/login",
  passport.authenticate("local", { session: true }),
  (req, res, next) => {
    // console.log(req.user);
    res.send(req.user);
  }
);
router.post("/logout", function (req, res) {
  console.log("deslogueado");
  req.logOut();
  res.status(200).send("Deslogueado correctamente");
});

router.get("/me", function (req, res) {
  //console.log(req.user);
  if (!req.user) {
    return res.sendStatus(401);
  }
  res.send(req.user);
});

router.put("/admin", (req, res, next) => {
  if (!req.user && req.user.rol !== "admin") res.sendStatus(401);
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
