import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not configured');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.log('MongoDB connection failed:', error.message);
    return false;
  }
};

export default connectDB;
