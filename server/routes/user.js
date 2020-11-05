const express = require("express");
const passport = require("passport");
const { findOne } = require("../db/models/user");
const Order = require("../db/models/order");
const User = require("../db/models/user");
const router = express.Router();
const { Op } = require("sequelize");

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
/* ----------Ruta User Cart--------------- */
router.post("/cart/:id", (req, res, next) => {});
router.get("/cart/:id", (req, res, next) => {});
router.put("/cart/:id", (req, res, next) => {});
router.delete("/cart/:id", (req, res, next) => {});

/* --------Rutas Admin--------- */

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
