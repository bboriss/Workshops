const router = require("express").Router();
const session = require("../sessions/sessions.const");
const path = require("path");
const { readDataFromDb } = require("../services/data.service");

// Users database path
const usersPath = path.join(__dirname, "..", "database", "users.json");

router.post("/login", (req, res) => {
  // Getting users from db
  const users = JSON.parse(readDataFromDb(usersPath));
  const credentials = req.body;

  users.forEach((user) => {
    if (
      user.password === credentials.password &&
      user.username === credentials.username &&
      user.isAdmin == true
    ) {
      req.session.adminLoggedIn = true;
      req.session.user = true;

      res.status(200).send({ message: "Admin is logged in" });
    } else if (
      user.password === credentials.password &&
      user.username === credentials.username &&
      user.isAdmin == false
    ) {
      req.session.userLoggedIn = true;
      req.session.user = true;

      res.status(200).send({ message: "User is logged in" });
    }
    // else {
    //   res.status(403).send({ message: "Bad credentials" });
    // }
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.send({ message: "Logout successful" });
});

module.exports = router;
