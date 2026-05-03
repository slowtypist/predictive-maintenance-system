import mongoose from 'mongoose';
import logger from './logger.js';

// The password contains an '@' symbol, so it must be URL encoded as %40
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dbuser:Shiva%408008@cluster0.qnti2pd.mongodb.net/aeropredict?appName=Cluster0';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default mongoose;
