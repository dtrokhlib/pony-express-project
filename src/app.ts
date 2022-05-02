import express from 'express';
import compression from 'compression';
import { notFoundController } from './controllers/not-found.controller';
import { logger } from './middleware/logger';
import { emailRouter } from './routes/email.routes';
import { userRouter } from './routes/user.routes';
import path from 'path';
import { basicAuth } from './middleware/basic-auth';

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(logger);
app.use(compression());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(basicAuth);
app.use('/users', userRouter);
app.use('/emails', emailRouter);
app.use(notFoundController);

export { app };
