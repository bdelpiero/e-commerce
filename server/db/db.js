const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost/ecommerce", { logging: false });

module.exports = db;
