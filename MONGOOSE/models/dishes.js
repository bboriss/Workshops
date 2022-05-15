const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A dish must have a name"],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please set the price for the dish"],
  },
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
