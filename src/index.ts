import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const boot = () => {
  mongoose.connect(process.env.MONGODB_URL!, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('MongoDB connected');
    }
  });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

boot();
