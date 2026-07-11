require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Scholar = require('../models/Scholar');
const scholarsSeedData = require('../data/scholarsSeedData');

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
