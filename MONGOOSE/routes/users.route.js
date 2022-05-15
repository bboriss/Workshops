const router = require("express").Router();
const { signup, login, logout } = require("../controllers/auth");
const { getAllUsers } = require("../controllers/user");
const { protect, restrictTo } = require("../controllers/auth.js");

router.route("/signup").post(signup);
router.route("/login").post(login);

router.use(protect);

router.route("/logout").post(logout);

router.route("/").get(restrictTo("chef"), getAllUsers);

module.exports = router;
