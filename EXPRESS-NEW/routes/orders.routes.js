const router = require("express").Router();
const { validateAdminSession } = require("../services/session_validator");

const {
  getAllOrders,
  addNewOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateStatus,
} = require("../controllers/orders.controllers");

router.route("/").get(validateAdminSession, getAllOrders);
router.route("/add").post(validateAdminSession, addNewOrder);
router
  .route("/:id")
  .get(validateAdminSession, getOrderById)
  .patch(validateAdminSession, updateOrder)
  .delete(validateAdminSession, deleteOrder);
router.route("/:id/:status").patch(validateAdminSession, updateStatus);

module.exports = router;
