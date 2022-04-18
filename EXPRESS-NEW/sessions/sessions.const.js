const session = require("express-session");

module.exports = session({
  secret: "secret_123",
  name: "cookie_id",
  cookie: {
    maxAge: 5 * 60 * 60 * 1000,
  },
  saveUninitialized: true,
  resave: true,
});

// const authAdminSession = session({
//   secret: "new_secret",
//   name: "fruits_cookie",
//   cookie: {
//     maxAge: 5 * 60 * 60 * 1000,
//   },
//   saveUninitialized: true,
//   resave: false,
// });
