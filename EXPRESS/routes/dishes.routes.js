const router = require("express").Router();
const DishesController = require("../controllers/dishes.controllers");

const dishesController = new DishesController();

router.get("/", async (req, res) => {
  const dishes = await dishesController.getAllDishesItems();

  res.send(dishes);
});

router.get("/:id?", async (req, res) => {
  const dishId = req.params.id;

  if (dishId) {
    const dishItem = await dishesController.getItemById(dishId);

    res.send(dishItem);
  }
});

router.post("/add", async (req, res) => {
  const newItem = req.body;
  const newData = await dishesController.addNewDish(newItem);
  res.send(newData);
});

router.put("/:id/update", async (req, res) => {
  const itemId = req.params.id;
  const updates = req.body;

  if (updates) {
    const updatedItem = await dishesController.updateDishesItem(
      itemId,
      updates
    );
    res.send(updatedItem);
  } else {
    res.status(400).json({ message: "No request body found!" });
  }
});

module.exports = router;
