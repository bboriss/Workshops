const express = require("express");
const session = require("./sessions/sessions.const");
const router = require("./router.const");

// const authRoutes = require("./routes/auth.routes");

const app = express();

// middlewares
app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(session);
app.use(router);

app.get("*", (req, res) => {
  res.sendFile(errorPage);
});

app.listen(PORT, HOST, () => {
  console.log(`Server is listening at port: ${PORT}`);
});
