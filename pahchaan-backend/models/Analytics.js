const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  event: { type: String, required: true }, // e.g. 'page_view', 'kit_generated'
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  meta: { type: Object }, // any extra data
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Analytics', analyticsSchema);