import mongoose from 'mongoose';
import env from './env.js';

/**
 * Connects to MongoDB database using configuration values.
 * Sets up connection lifecycle event listeners.
 */
export const connectDB = async () => {
  if (!env.MONGODB_URL) {
    console.error('Database connection failed: MONGODB_URL is not set.');
    process.exit(1);
  }

  // Setup connection event listeners
  mongoose.connection.on('connected', () => {
    console.log('MongoDB successfully connected.');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB connection disconnected.');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB connection reestablished.');
  });

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(env.MONGODB_URL);
  } catch (error) {
    console.error(`Error initialising database connection: ${error.message}`);
    // We do not exit the process here so that the Express server stays running.
    // This allows the health check endpoint to remain reachable and report status DOWN,
    // and lets Mongoose attempt automatic reconnection.
  }
};

export default connectDB;
