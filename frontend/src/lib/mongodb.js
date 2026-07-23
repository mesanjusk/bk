import mongoose from 'mongoose';

// Reuse the connection across serverless function invocations (and across
// hot reloads in dev) instead of opening a new one on every request.
const globalForMongoose = globalThis;

let cached = globalForMongoose._mongoose;
if (!cached) {
  cached = globalForMongoose._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set.');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
