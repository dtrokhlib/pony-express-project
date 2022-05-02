import { readBodyChunks } from '../helpers/read-body-chunks';
import { Request, Response, NextFunction } from 'express';

export const jsonBodyParser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Can be done via express.json middleware or body-parser, but this is 
  // pure realization for understanding data stream in request object
  const body = await readBodyChunks(req);
  req.body = JSON.parse(body as string);

  next();
};
