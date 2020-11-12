const S = require("sequelize");
const db = require("../db");

class Product extends S.Model {}
Product.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    price: {
      type: S.REAL,
      get() {
        return "$" + this.getDataValue("price");
      },
    },
    description: {
      type: S.TEXT,
    },
    available: {
      type: S.BOOLEAN,
      defaultValue: true,
      // set(valor) {
      //   if (valor == true) this.title = this.title.replace(" NO DISPONIBLE", "");
      //   else this.title = `${this.title} NO DISPONIBLE`;
      // },
    },
    stock: {
      type: S.INTEGER,
      set(valor) {
        if (valor == 0) this.available = false;
        else this.available = true;
        this.setDataValue("stock", valor);
      },
      validate:{
        min:0
      }
    },
    imageUrl: {
      type: S.STRING,
    },
    ISBN: {
      type: S.STRING,
    },
    author: {
      type: S.STRING,
      allowNull: false,
    },
    publisher: {
      type: S.STRING,
    },
    // aditionalInformation: {
    //     type: S.ARRAY(S.STRING),
    // }
  },
  {
    sequelize: db,
    modelName: "product",
  }
);

// Class methods:
Product.availability = function () {
  return Product.findAll({
    where: {
      [S.Op.or]: [{ stock: 0 }, { available: false }],
    },
  });
};

// // Instance methods
// Producto.prototype.ganancia = function () {
//     return this.stock * +this.precio.substring(1);
//   };

module.exports = Product;
