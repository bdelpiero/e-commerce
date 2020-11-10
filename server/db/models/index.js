const User = require("./user");
const Product = require("./product");
const Category = require("./category");
const Review = require("./review");
const Order = require("./order");
const Order_Product = require("./Order_Product");

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: Order_Product });
Product.belongsToMany(Order, { through: Order_Product });
Order_Product.belongsTo(Product);
Order_Product.belongsTo(Order);

Product.belongsToMany(Category, { through: "Product_Category" });
Category.belongsToMany(Product, { through: "Product_Category" });

User.belongsToMany(Product, { through: Review });
Product.belongsToMany(User, { through: Review });
Review.belongsTo(Product);
Review.belongsTo(User);

module.exports = {
  User,
  Product,
  Category,
  Review,
  Order,
  Order_Product,
};
