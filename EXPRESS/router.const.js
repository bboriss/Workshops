const router = require("express").Router();
const dishesRouter = require("./routes/dishes.routes");
// const ordersRouter = require("./routes/orders.routes");

router.use("/dishes", dishesRouter);
// router.use("/orders", ordersRouter);

module.exports = router;
