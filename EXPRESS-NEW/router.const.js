const router = require("express").Router();
const dishesRouter = require("./routes/dishes.routes");
const ordersRouter = require("./routes/orders.routes");
const authRoutes = require("./routes/auth.routes");

//  Dishes routes
router.use("/dishes", dishesRouter);

// Orders routes
router.use("/orders", ordersRouter);

// Authentication routes
router.use("/", authRoutes);

module.exports = router;
