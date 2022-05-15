const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An order must have a name"],
    unique: false,
    trim: true,
  },
  status: {
    type: String,
    required: [true, "Please set the status for the order"],
    enum: {
      values: ["new", "canceled", "preparing"],
      message: "Please give a status: new, canceled or preparing",
    },
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
