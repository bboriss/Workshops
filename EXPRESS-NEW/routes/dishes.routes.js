const router = require("express").Router();
const {
  validateUserSession,
  numberOfItemsChecker,
  validateAdminSession,
} = require("../services/session_validator");

const {
  getAllDishes,
  addNewDish,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/dishes.controllers");

router.route("/").get(validateAdminSession, validateUserSession, getAllDishes);
router
  .route("/add")
  .post(
    validateAdminSession,
    validateUserSession,
    numberOfItemsChecker,
    addNewDish
  );
router
  .route("/:id")
  .get(validateAdminSession, validateUserSession, getItemById)
  .patch(validateAdminSession, updateItem)
  .delete(validateAdminSession, deleteItem);

module.exports = router;
