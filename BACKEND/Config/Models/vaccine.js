const mongoose = require('mongoose');

// Vaccine Schema
const vaccineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  purpose: {
    type: [String],
    required: true,
  },
  recommendedAge: {
    type: String, // e.g. "At birth", "6 weeks", "9 months"
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vaccine', vaccineSchema);
