var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILME_SMPT_HOST,
  port: process.env.MAILME_SMPT_PORT,
  secure: Boolean(process.env.MAILME_SMPT_SSL),
  auth: {
    user: process.env.MAILME_SMPT_USER,
    pass: process.env.MAILME_SMPT_PASS,
  },
});

module.exports = transporter;
