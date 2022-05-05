import { app } from './app';
import http from 'http';
import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { registerMessageHandler } from './controllers/chat.controller';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const boot = () => {
  const server = http.createServer(app);
  const io = new Server(server);

  mongoose.connect(process.env.MONGODB_URL!, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('MongoDB connected');
    }
  });
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const onConnection = async (socket: Socket) => {
    registerMessageHandler(io, socket);
  };

  io.on('connection', onConnection);
};

boot();
