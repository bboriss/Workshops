const Dish = require("../models/dishes");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/asyncWrapper");

getAllDishes = catchAsync(async (req, res) => {
  const dishes = await Dish.find({});

  res.status(200).json({
    status: "success",
    results: dishes.length,
    data: {
      dishes,
    },
  });
});

getDishById = catchAsync(async (req, res) => {
  const id = req.params["id"];
  const dish = await Dish.findById(id);

  if (!dish) {
    return next(new AppError("No dish found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      dish,
    },
  });
});

createDishes = catchAsync(async (req, res) => {
  const newDish = await Dish.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      dish: newDish,
    },
  });
});

deleteDishesById = async (req, res) => {
  const id = req.params["id"];
  const response = await Dish.findByIdAndRemove(id);

  if (!response) {
    return next(new AppError("No dish found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

module.exports = {
  getAllDishes,
  getDishById,
  createDishes,
  deleteDishesById,
};
