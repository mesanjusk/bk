import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    heroMediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    heroMediaUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

// Singleton: always read/write the one settings document.
siteSettingsSchema.statics.getSingleton = async function getSingleton() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
