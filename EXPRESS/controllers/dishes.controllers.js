const DishesModel = require("../models/dishes.model");
const dishesModel = new DishesModel();

class DishesController {
  getAllDishesItems() {
    return dishesModel.getAllDishesItems();
  }
  getItemById(dishId) {
    return dishesModel.getDishById(dishId);
  }
  addNewDish(dishObj) {
    return dishesModel.addNewDish(dishObj);
  }
  updateItem(itemId, updatesObj) {
    return dishesModel.putDishesItem(itemId, updatesObj);
  }
}

module.exports = DishesController;
