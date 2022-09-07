const mongoose = require("mongoose");

const pointsSchema = new mongoose.Schema({
  id: String,
  points: Number,
});

const PointsModel = mongoose.model("Points", pointsSchema);

module.exports = PointsModel;
