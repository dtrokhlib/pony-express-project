import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017';
const PORT = Number(process.env.PORT) || 3000;

const boot = () => {
  mongoose.connect(MONGODB_URL, () => {
    console.log('MongoDB connected');
  });
  app.listen(3000, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

boot();
