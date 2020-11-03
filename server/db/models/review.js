const S = require("sequelize");
const db = require("../db");

class Review extends S.Model {}

Review.init(
  {
    id: {
      type: S.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    comment: {
      type: S.STRING
    },
    rating:{ 
    type: S.REAL
    },
  },
  {sequelize: db, modelName: "review",}
);

module.exports = Review

// const Grant = sequelize.define('grant', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false
//   },
//   selfGranted: DataTypes.BOOLEAN
// }, { timestamps: false });