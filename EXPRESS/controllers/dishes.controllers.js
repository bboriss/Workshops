const DishesModel = require("../models/dishes.model");
const dishesModel = new DishesModel();

class DishesController {
  getAllDishesItems() {
    return dishesModel.getAllDishesItems();
  }
  addNewDish(dishObj) {
    return dishesModel.addNewDish(dishObj);
  }
  getItemById(dishId) {
    return dishesModel.getDishById(dishId);
  }
  updateItem(itemId, updatesObj) {
    return dishesModel.putDishesItem(itemId, updatesObj);
  }
}

module.exports = DishesController;
