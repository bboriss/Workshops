const router = require("express").Router();

const dishesRoutes = require("./routes/dishes.route");
const ordersRoutes = require("./routes/orders.route");
const authRoutes = require("./routes/users.route");

router.use("/dishes", dishesRoutes);
router.use("/orders", ordersRoutes);
router.use("/users", authRoutes);

module.exports = router;
