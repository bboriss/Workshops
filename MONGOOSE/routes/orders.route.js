const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/auth.js");

const {
  getAllOrders,
  getOrderById,
  addNewOrder,
  updateOrder,
  deleteOrderById,
} = require("../controllers/orders");

router.use(protect);

router
  .route("/")
  .get(restrictTo("chef", "waiter"), getAllOrders)
  .post(restrictTo("guest"), addNewOrder);
router
  .route("/:id")
  .get(restrictTo("chef", "waiter", "guest"), getOrderById)
  .patch(restrictTo("chef", "waiter"), updateOrder)
  .delete(restrictTo("chef", "waiter"), deleteOrderById);

module.exports = router;
