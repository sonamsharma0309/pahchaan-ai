const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  businessName: { type: String, required: true },
  industry: { type: String },
  description: { type: String },
  targetAudience: { type: String },
  location: { type: String },
  vibes: [{ type: String }],
  competitors: { type: String },
  inspiration: { type: String },
  email: { type: String },

  // AI Generated output
  generatedKit: {
    brandName: String,
    tagline: String,
    colors: [String],
    fonts: [String],
    logoPrompt: String,
    brandVoice: String,
    socialBio: String,
  },

  status: {
    type: String,
    enum: ['pending', 'generated', 'failed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Brand', brandSchema);