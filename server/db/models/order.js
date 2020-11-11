const S = require("sequelize");
const db = require("../db");
const Product = require("./product");

class Order extends S.Model {}

Order.init(
  {
    status: {
      type: S.ENUM(
        "Pendiente",
        "Creado",
        "Procesando",
        "Cancelado",
        "Completado"
      ),
      defaultValue: "Pendiente",
    },
    firstName:{
      type:S.STRING
    },
    lastName:{
      type:S.STRING
    },
    city:{
      type:S.STRING
    },
    total: {
      type: S.REAL,
    },
    paymentMethod: {
      type: S.ENUM("Efectivo", "Tarjeta de Credito", "Transferencia Bancaria"),
      defaultValue: "Tarjeta de Credito"
    },
    cardNumber:{
      type: S.STRING,
      set(data){
        this.setDataValue("cardNumber", `**** - ${data.substr(data.length-4)}`)
      }
    },
    address: {
      type: S.STRING,
      // allowNull: false,
      // defaultValue: "la direccion al crear la cuenta"
    },
  },
  {
    sequelize: db,
    modelName: "order",
  }
);

// Order.prototype.totalPayment = function(){
//     return Product.findAll({where:{orderId: this.id}})
//                 .then(products => products.reduce((a, b)=>{
//                     a.price+b.price
//                 }, 0))
// }

module.exports = Order;
