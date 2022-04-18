const path = require("path");
const dataService = require("../data.service");

const dishesPath = path.join(__dirname, "..", "db", "dishes.json");

class DishesModel {
  getAllDishesItems() {
    return new Promise((resolve, reject) => {
      const dishesData = dataService.readDataFromDb(dishesPath);

      if (dishesData) {
        resolve(JSON.parse(dishesData));
      } else {
        reject({
          message: "Error! No dishes found!",
        });
      }
    });
  }

  getDishById(itemId) {
    return new Promise((resolve, reject) => {
      const dishesData = JSON.parse(dataService.readDataFromDb(dishesPath));
      const foundItem = dishesData.find((item) => item.id == itemId);

      if (foundItem) {
        resolve(foundItem);
      }
      // if (typeof foundItem === "undefined") {
      //   reject({ message: "No aparatents currently." });
      // }
    });
  }

  addNewDish(dishObj) {
    return new Promise((resolve, reject) => {
      const dishesData = JSON.parse(dataService.readDataFromDb(dishesPath));
      if (dishObj.price < 1000) {
        dishesData.push(dishObj);
        //Saving the updated dishes in db
        dataService.writeDataToDb(dishesPath, JSON.stringify(dishesData));

        resolve({
          message: "Item added successfully!",
        });
      } else {
        reject({ message: "Item too expensive" });
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
