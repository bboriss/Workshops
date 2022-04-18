const OrdersModel = require("../models/orders.models");

const ordersModel = new OrdersModel();

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await ordersModel.getAllOrders();
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const addNewOrder = async (req, res) => {
  try {
    const newOrder = await ordersModel.addOrder(req.body);
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderID = req.params.id;
    const singleOrder = await ordersModel.getOrderById(orderID);

    res.status(200).send(singleOrder);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};
const updateOrder = async (req, res) => {
  try {
    const taskID = req.params.id;
    const newData = req.body;

    const updatedOrder = await ordersModel.updateOrderItem(taskID, newData);

    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const taskID = req.params.id;

    const deletedOrder = await ordersModel.deleteItem(taskID);

    res.status(200).send(deletedOrder);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const updateStatus = async (req, res) => {
  try {
    const orderID = req.params.id;
    const orderNewStatus = req.params.status;
    const updateOrderStatus = await ordersModel.updateOrderStatus(
      orderID,
      orderNewStatus
    );

    res.status(200).send(updateOrderStatus);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

module.exports = {
  getAllOrders,
  addNewOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateStatus,
};
