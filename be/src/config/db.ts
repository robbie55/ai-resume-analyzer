import mongoose from 'mongoose';
import { getEnv } from '../util';

/**
 * connectDB handles connecting to our mongoDB atlas cluster
 */
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(getEnv('MONGO_URI'));
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;
