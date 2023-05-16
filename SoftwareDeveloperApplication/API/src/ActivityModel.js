const mongoose = require("mongoose");


/**
 * Create a Schema for activity documents to add type validation
 */
const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: Number,
    required: true,
  },
  participants: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  accessibility: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const ActivityModel = mongoose.model("Activity", ActivitySchema);

module.exports = ActivityModel;
