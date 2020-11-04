const Sequelize = require("sequelize");

const db = new Sequelize('postgres://postgres:ratapompa2011@localhost:5432/omdb', {
    logging: false, // set to console.log to see the raw SQL queries
    operatorsAliases: Sequelize.Op, // set operators
  })

module.exports = db;
