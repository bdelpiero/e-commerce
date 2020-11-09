const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/facebook", passport.authorize("facebook", { scope: ["email"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/register",
  })
);

module.exports = router;
