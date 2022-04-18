const DishesModel = require("../models/dishes.models");

const dishesModel = new DishesModel();

const getAllDishes = async (req, res) => {
  try {
    const allDishes = await dishesModel.getAllDishes();
    res.status(200).send(allDishes);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const addNewDish = async (req, res) => {
  try {
    const newDish = await dishesModel.addDish(req.body);
    res.status(200).send(newDish);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const getItemById = async (req, res) => {
  try {
    const taskID = req.params.id;
    const singleDish = await dishesModel.getDishById(taskID);

    res.status(200).send(singleDish);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const updateItem = async (req, res) => {
  try {
    const taskID = req.params.id;
    const newData = req.body;

    const updatedDish = await dishesModel.updateDishItem(taskID, newData);

    res.status(200).send(updatedDish);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const deleteItem = async (req, res) => {
  try {
    const taskID = req.params.id;

    const deletedDish = await dishesModel.deleteItem(taskID);

    res.status(200).send(deletedDish);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

module.exports = {
  getAllDishes,
  addNewDish,
  getItemById,
  updateItem,
  deleteItem,
};
