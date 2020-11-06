const S = require("sequelize");
const db = require("../db");

class Order_Product extends S.Model {}

Order_Product.init(
  {
    id: {
      type: S.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    total: {
      type: S.INTEGER,
      defaultValue: 1,
    },
  },
  { sequelize: db, modelName: "Order_Product", tableName: "Order_Product" }
);

module.exports = Order_Product;
