const express = require("express");
const router = express.Router();
const controller = require("../controller/mail");

router.post("/send", controller.sendMail);

module.exports = router;
