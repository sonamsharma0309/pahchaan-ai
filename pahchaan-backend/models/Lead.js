const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  message: { type: String },
  source: {
    type: String,
    enum: ['contact', 'newsletter', 'getstarted'],
    default: 'contact',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', leadSchema);