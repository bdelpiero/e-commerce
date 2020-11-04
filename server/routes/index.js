const express = require("express");
const router = express.Router();
let userRoutes = require("./user");

router.use("/user", userRoutes);

module.exports = router;
