require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./router.const");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
// const session = require("./const/session.const");

const app = express();
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

// app.use(session);
app.use(cookieParser());
app.use(router);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

mongoose.connect(process.env.MONGO_URI, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("CONNECTED TO DATABASE SUCCESS!");

  app.listen(PORT, HOST, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
