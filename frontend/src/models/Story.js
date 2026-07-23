import mongoose from 'mongoose';

const storySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    state: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    before: { type: String, required: true },
    after: { type: String, required: true },
    narrative: { type: String, required: true },
    extended: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Story || mongoose.model('Story', storySchema);
