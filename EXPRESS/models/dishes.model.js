const path = require("path");
const dataService = require("../data.service");

const dishesPath = path.join(__dirname, "..", "db", "dishes.json");

class DishesModel {
  getAllDishesItems() {
    return new Promise((resolve, reject) => {
      const dishesData = dataService.readDataFromDb(dishesPath);
      resolve(JSON.parse(dishesData));
    });
  }

  getDishById(itemId) {
    return new Promise((resolve, reject) => {
      const dishesData = JSON.parse(dataService.readDataFromDb(dishesPath));

      const foundItem = dishesData.find((item) => item.id === itemId);

      if (foundItem) {
        resolve(foundItem);
      } else {
        reject({
          message: "Error! No item found!",
        });
      }
    });
  }

  addNewDish(dishObj) {
    return new Promise((resolve, reject) => {
      const dishesData = JSON.parse(dataService.readDataFromDb(dishesPath));
      if (dishObj.price < 1000) {
        //Adding the item to the inventory array
        dishesData.push(dishObj);
        //Saving the updated inventory in db
        dataService.writeDataToDb(dishesPath, JSON.stringify(dishesData));

        resolve({
          message: "Item added successfully!",
        });
      } else {
        reject({ message: "Item too expencive" });
      }
    });
  }

  putDishesItem(itemId, updatesObj) {
    return new Promise((resolve, reject) => {
      //Read data from db
      const dishesData = JSON.parse(dataService.readDataFromDb(dishesPath));
      //Using for each to update the item
      dishesData.forEach((item) => {
        if (item.id === itemId) {
          (item.name = updatesObj.name), (item.price = updatesObj.price);
        }
      });
      //Saving the updated inventory in db
      dataService.writeDataToDb(dishesPath, JSON.stringify(inventoryData));
      resolve({
        message: "Item updated successfully!",
      });
    });
  }
}

module.exports = DishesModel;
