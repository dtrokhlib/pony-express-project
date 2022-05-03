import { NextFunction, Request, Response } from 'express';

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    return res.status(401).send('Unauthorized');
  }

  next();
};
