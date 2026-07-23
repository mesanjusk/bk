import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../src/lib/mongodb.js';
import Scholar from '../src/models/Scholar.js';
import scholarsSeedData from './scholarsSeedData.mjs';

async function seed() {
  await connectDB();
  await Scholar.deleteMany({});
  await Scholar.insertMany(scholarsSeedData);
  console.log(`Seeded ${scholarsSeedData.length} scholars.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
