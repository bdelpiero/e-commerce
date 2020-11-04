const S = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../db");

class User extends S.Model {}

User.init(
  {
    userName: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: S.STRING,
      validate: {
        notEmpty: true,
      },
    },
    rol: {
      type: S.ENUM("user", "admin"),
      defaultValue: "user",
    },
    adress: {
      type: S.STRING,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);

User.beforeCreate((user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, user.salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

User.prototype.hash = function (password, salt) {
  return bcrypt.hash(password, salt);
};

module.exports = User;
