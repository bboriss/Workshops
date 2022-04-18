const path = require("path");

const { readDataFromDb, writeDataToDb } = require("../services/data.service");

// dishes database path
const dishesPath = path.join(__dirname, "..", "database", "dishes.json");

// constructor class

class DishesModel {
  getAllDishes() {
    return new Promise((resolve, reject) => {
      const dishesData = JSON.parse(readDataFromDb(dishesPath));
      resolve(dishesData);
    });
  }

  // for adding new dishes

  addDish(newDishData) {
    return new Promise((resolve, reject) => {
      const existingDishes = JSON.parse(readDataFromDb(dishesPath));

      // checking if price is not more than 1000 or less than 1
      if (newDishData.price < 1000 && newDishData.price > 1) {
        const newItem = {
          id: new Date().getTime().toString(36),
          ...newDishData,
        };
        const newDishesDB = [...existingDishes, newItem];

        writeDataToDb(dishesPath, JSON.stringify(newDishesDB));

        resolve({
          message: "Item added successfully!",
        });
      } else {
        reject({ message: "Item too expensive or invalid price" });
      }
    });
  }

  // getting Item by ID

  getDishById(itemId) {
    return new Promise((resolve, reject) => {
      const dishesData = JSON.parse(readDataFromDb(dishesPath));
      const foundItem = dishesData.find((item) => item.id == itemId);

      if (foundItem) {
        resolve(foundItem);
      }
      if (typeof foundItem === "undefined") {
        reject({ message: "Invalid ID" });
      }
    });
  }

  // update Item

  updateDishItem(itemId, updatesObj) {
    return new Promise((resolve, reject) => {
      // Read data from db
      const dishesData = JSON.parse(readDataFromDb(dishesPath));
      // Extracting all names from database
      const idArray = dishesData.map((objectDish) => objectDish.id);
      //Using for each to update the item
      dishesData.forEach((item) => {
        // Checking if ID maches
        if (item.id === itemId) {
          (item.name = updatesObj.name), (item.price = updatesObj.price);
          writeDataToDb(dishesPath, JSON.stringify(dishesData));

          resolve({
            message: "Item updated successfully!",
          });
        }
        if (!idArray.includes(itemId)) {
          reject({ message: "Item not updated successfully" });
        }
      });
    });
  }

  // delete Item

  deleteItem(itemId) {
    return new Promise((resolve, reject) => {
      //Read data from db
      let dishesData = JSON.parse(readDataFromDb(dishesPath));

      // Filtering database
      const filteredDishes = dishesData.filter((item) => item.id !== itemId);

      if (filteredDishes.length !== dishesData.length) {
        // Saving the updated dishes in db
        writeDataToDb(dishesPath, JSON.stringify(filteredDishes));

        resolve({
          message: "Item deleted successfully!",
        });
      }
      if (dishesData.length == filteredDishes.length) {
        reject({ message: "Item not deleted successfully" });
      }
    });
  }
}

module.exports = DishesModel;
