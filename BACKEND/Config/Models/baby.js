const mongoose = require('mongoose');

const vaccineScheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'missed'],
    default: 'pending',
  },
  vaccineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaccine',
  },
});

const babySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  vaccineSchedule: [vaccineScheduleSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Baby', babySchema);
