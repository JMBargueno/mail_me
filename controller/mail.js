const transporter = require("../core/nodemailer");

let controller = {
  sendMail: (req, res) => {
    console.log(req.body);
    if (
      req.body?.subject &&
      req.body?.name &&
      req.body?.email &&
      req.body?.message
    ) {
      let mailOptions = {
        from: "Mail Me Notificator <" + process.env.MAILME_SMPT_USER + ">",
        to: process.env.MAILME_TO,
        subject: req.body?.subject,
        text: `Name: ${req.body?.name}\nEmail: ${req.body?.email}\nMessage:\n${req.body?.message}`,
      };

      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(204).json();
        }
      });
    } else {
      console.log(req.body?.subject);
      res.status(400).json({
        subject: req.body?.subject ? "Valid" : "Invalid",
        name: req.body?.name ? "Valid" : "Invalid",
        email: req.body?.email ? "Valid" : "Invalid",
        message: req.body?.message ? "Valid" : "Invalid",
      });
    }
  },
};
module.exports = controller;
