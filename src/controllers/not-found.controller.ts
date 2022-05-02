import { Request, Response, NextFunction } from 'express';
import { NotFound } from '../errors/error-not-found';

export const notFoundController = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NotFound) {
    res.status(404).send(err.message);
  } else {
    next(err);
  }
};
