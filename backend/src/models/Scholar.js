const mongoose = require('mongoose');

const scholarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    year: { type: Number, required: true, index: true },
    photoUrl: { type: String, default: '' },
    state: { type: String, default: '' },
    score: { type: String, default: '' },
    description: { type: String, required: true },
    bio: { type: String, default: '' },
    achievements: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Scholar', scholarSchema);
