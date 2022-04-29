require("dotenv").config();
const router = require("express").Router();
const path = require("path");

const AuthController = require("../controllers/auth.controller");
const ac = new AuthController();

const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const fileService = require("../utils/file-service");

const usersDB = path.join(__dirname, "..", "db", "users.json");

// REGISTER ROUTES

//localhost:3000/api/auth/register
router.post("/register", async (req, res) => {
  const credentials = req.body;
  console.log(credentials);
  const schema = joi.object({
    username: joi.string().min(5),
    password: joi.string().min(5),
  });
  const validation = schema.validate(credentials);
  if (validation.error) {
    return res
      .status(400)
      .send({ message: validation.error.details[0].message });
  }

  //Read from db
  const users = fileService.readFile(usersDB);

  // Check if user exists

  const exists = users.some((u) => u.username === credentials.username);

  if (exists) {
    return res.status(400).send({
      message: `User with the username ${credentials.username} already exists`,
    });
  }

  //Create the user
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(credentials.password, salt);
  console.log(hashedPassword);
  const user = {
    id: uuid(),
    username: credentials.username,
    password: hashedPassword,
  };

  const usersToBeSaved = [...users, user];
  //Save back to DB users
  fileService.writeFile(usersDB, usersToBeSaved);

  res.status(201).send({ message: "User is registered successfully." });
});

// LOGIN ROUTES

router.post("/login", async (req, res) => {
  const credentials = req.body;

  //Read from db =)
  const users = fileService.readFile(usersDB);

  //Check if exists
  const user = users.find((u) => u.username === credentials.username);

  if (!user) {
    return res.status(400).send({
      message: `User with the username ${credentials.username} does not exist`,
    });
  }

  //Compare the passwords
  console.log("User pass of req.body:", credentials.password);
  console.log("user pass from DB", user.password);

  const validPassword = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!validPassword) {
    return res.status(404).send({ message: "Invalid credentials" });
  }

  // ACCESS TOKEN

  const accessToken = jwt.sign(
    {
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET
    // { expiresIn: "20s" }
  );

  // REFRESH TOKEN

  const refreshToken = jwt.sign(
    {
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET
  );

  fileService.addToken(refreshToken);

  res.header("Authorization", accessToken).send({
    message: "Logged in",
    accessToken,
    refreshToken,
  });

  // res.send({ message: "User is logged in." });
});

module.exports = router;
