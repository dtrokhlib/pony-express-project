import express from 'express';
import compression from 'compression';
import path from 'path';

import { notFoundController } from './controllers/404.controller';
import { logger } from './middleware/logger';
import { basicAuth } from './middleware/basic-auth';
import { emailRouter } from './routes/email.routes';
import { userRouter } from './routes/user.routes';
import bodyParser from 'body-parser';

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger);
app.use(compression());

app.use(basicAuth);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/users', userRouter);
app.use('/emails', emailRouter);
app.use(notFoundController);

export { app };
