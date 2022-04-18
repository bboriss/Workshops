const path = require("path");

const { readDataFromDb, writeDataToDb } = require("../services/data.service");

// Orders database path
const ordersPath = path.join(__dirname, "..", "database", "orders.json");

// Constructor class

class OrdersModel {
  getAllOrders() {
    return new Promise((resolve, reject) => {
      const ordersData = JSON.parse(readDataFromDb(ordersPath));
      resolve(ordersData);
    });
  }

  // For adding new Orders

  addOrder(newOrderData) {
    return new Promise((resolve, reject) => {
      const existingOrders = JSON.parse(readDataFromDb(ordersPath));

      // Check if order already exists
      // If it exists, validator will return false and adding will not be possible
      const validator = this.checkExistence(existingOrders, newOrderData.name);

      if (validator) {
        const newItem = {
          id: new Date().getTime().toString(36),
          ...newOrderData,
        };
        const newOrdersDB = [...existingOrders, newItem];

        writeDataToDb(ordersPath, JSON.stringify(newOrdersDB));

        resolve({
          message: "Item added successfully!",
        });
      } else {
        reject({ message: "Item is already on the list!" });
      }
    });
  }

  // Checker if Order already exists
  checkExistence(database, orderName) {
    const arrayOfNames = database.map((order) => order.name);

    if (arrayOfNames.includes(orderName)) {
      return false;
    } else {
      return true;
    }
  }

  // Getting Item by ID

  getOrderById(itemId) {
    return new Promise((resolve, reject) => {
      const ordersData = JSON.parse(readDataFromDb(ordersPath));
      const foundItem = ordersData.find((item) => item.id == itemId);

      if (foundItem) {
        resolve(foundItem);
      }
      if (typeof foundItem === "undefined") {
        reject({ message: "Invalid ID" });
      }
    });
  }

  // Update Item

  updateOrderItem(itemId, updatesObj) {
    return new Promise((resolve, reject) => {
      // Read data from db
      const ordersData = JSON.parse(readDataFromDb(ordersPath));
      //   Extracting all names from database
      const IdArray = ordersData.map((objectOrder) => objectOrder.id);
      //Using for each to update the item
      ordersData.forEach((item) => {
        // Checking if ID maches
        if (item.id == itemId) {
          (item.name = updatesObj.name), (item.price = updatesObj.price);

          writeDataToDb(ordersPath, JSON.stringify(ordersData));

          resolve({
            message: "Item updated successfully!",
          });
        }
        if (!IdArray.includes(itemId)) {
          reject({ message: "Item not updated successfully" });
        }
      });
    });
  }

  // Delete Item

  deleteItem(itemId) {
    return new Promise((resolve, reject) => {
      //Read data from db
      let ordersData = JSON.parse(readDataFromDb(ordersPath));

      // Filtering database
      const filteredOrders = ordersData.filter((item) => item.id !== itemId);

      if (filteredOrders.length !== ordersData.length) {
        // Saving the updated orders in db
        writeDataToDb(ordersPath, JSON.stringify(filteredOrders));

        resolve({
          message: "Item deleted successfully!",
        });
      }
      if (ordersData.length == filteredOrders.length) {
        reject({ message: "Item not deleted successfully" });
      }
    });
  }

  // Update Order Status

  updateOrderStatus(orderId, newStatus) {
    return new Promise((resolve, reject) => {
      // Read data from db
      const orderData = JSON.parse(readDataFromDb(ordersPath));
      // Extracting all names from database
      const idArray = orderData.map((objectOrder) => objectOrder.id);
      //Using for each to update the item

      orderData.forEach((item) => {
        // Checking if ID maches
        console.log(item);
        if (item.id === orderId) {
          item.status = newStatus;

          writeDataToDb(ordersPath, JSON.stringify(orderData));

          resolve({
            message: "Item updated successfully!",
          });
        }
        if (!idArray.includes(orderId)) {
          reject({ message: "Item not updated successfully" });
        }
      });
    });
  }
}

module.exports = OrdersModel;
