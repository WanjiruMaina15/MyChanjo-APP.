//import mongoose
const mongoose = require('mongoose');

// Baby Schema
const babySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  yearOfBirth: {
    type: Number,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  ageinMonths: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = mongoose.model('Baby', babySchema);
