import mongoose from 'mongoose';

const scholarOptionsSchema = new mongoose.Schema(
  {
    years: { type: [Number], default: [] },
    categories: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Singleton: always read/write the one options document.
scholarOptionsSchema.statics.getSingleton = async function getSingleton() {
  let options = await this.findOne();
  if (!options) {
    options = await this.create({});
  }
  return options;
};

export default mongoose.models.ScholarOptions || mongoose.model('ScholarOptions', scholarOptionsSchema);
