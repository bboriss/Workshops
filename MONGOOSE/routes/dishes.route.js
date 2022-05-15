const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/auth.js");
const {
  getAllDishes,
  getDishById,
  createDishes,
  deleteDishesById,
} = require("../controllers/dishes");

router.use(protect);

router.route("/").get(getAllDishes).post(restrictTo("chef"), createDishes);
router
  .route("/:id")
  .get(restrictTo("chef", "waiter"), getDishById)
  .delete(restrictTo("chef"), deleteDishesById);

module.exports = router;
