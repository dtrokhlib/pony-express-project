import { NextFunction, Request, Response } from 'express';

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization || '';
  let [type, payload] = header.split(' ');

  if (type === 'Basic' && typeof payload === 'string') {
    let credentials = Buffer.from(payload, 'base64').toString('ascii');
    let [username, password] = credentials.split(':');

    console.log(username,password)
  }

  next();
};
