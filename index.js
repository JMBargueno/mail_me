const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const morgan = require("morgan");
const compression = require("compression");
const mail_routes = require("./routes/mail");
const app = express();
const limiter = rateLimit({
  windowMs: (process.env.MAILME_RATE_LIMIT_MINS || 15) * 60 * 1000, // 15 minutes
  max: process.env.MAILME_RATE_LIMIT_REQUESTS || 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(compression());
app.set("port", process.env.MAILME_PORT || 7093);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(limiter);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api/mail/", mail_routes);

module.exports = app;
