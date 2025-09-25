import mongoose from 'mongoose';
import { mockDb } from './mock-db';

// Check if we should use mock database for development
const USE_MOCK_DB = !process.env.MONGODB_URI || process.env.NODE_ENV === 'development';

if (!USE_MOCK_DB && !process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

const MONGODB_URI: string = process.env.MONGODB_URI || '';

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use global to prevent multiple connections in development
declare global {
  var mongooseGlobal: GlobalMongoose | undefined;
}

let cached = global.mongooseGlobal;

if (!cached) {
  cached = global.mongooseGlobal = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  // Use mock database in development when MongoDB is not available
  if (USE_MOCK_DB) {
    await mockDb.connect();
    // Return a mock mongoose-like object for compatibility
    return mongoose as typeof mongoose;
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached!.conn = await cached!.promise;
    console.log('✅ Connected to MongoDB');
    return cached!.conn;
  } catch (e) {
    cached!.promise = null;
    console.error('❌ MongoDB connection error:', e);
    throw e;
  }
}

// Close connection (useful for serverless functions)
export async function disconnectDB(): Promise<void> {
  if (USE_MOCK_DB) {
    await mockDb.disconnect();
    return;
  }
  
  if (cached?.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}