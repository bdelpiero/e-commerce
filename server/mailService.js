const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(email, order, total, orderId) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "dondevaeljamon@gmail.com", // generated ethereal user
      pass: "dondevaeljamon2020", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Donde va el Jamon? Bookstore 👻" <dondevaeljamon@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Tu compra ha sido completada.", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1><span style="font-family: Arial, Helvetica, sans-serif;">Hola ${order.firstName}, su orden ha sido despachada y se encuentra en camino</span></h1>
          <h4><span style="font-family: Arial, Helvetica, sans-serif;">Orden de compra nro: ${orderId} </span></h4>
          <h4><span style="font-family: Arial, Helvetica, sans-serif;">Medio de pago: Tarjeta de Credito</span></h4>
          <h4><span style="font-family: Arial, Helvetica, sans-serif;">Monto: $ ${total}</span></h4>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);

module.exports = main