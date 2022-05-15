const Order = require("../models/orders");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/asyncWrapper");

getAllOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({});

  res.status(201).json({
    status: "success",
    data: {
      order: orders,
    },
  });
});

getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

addNewOrder = catchAsync(async (req, res) => {
  const newOrder = await Order.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      order: newOrder,
    },
  });
});

updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

deleteOrderById = catchAsync(async (req, res) => {
  const id = req.params["id"];
  const order = await Order.findByIdAndRemove(id);

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getAllOrders,
  getOrderById,
  addNewOrder,
  updateOrder,
  deleteOrderById,
};
