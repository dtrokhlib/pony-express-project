import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';
import { isValidObjectId } from 'mongoose';

export const jwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization || '';
  let [type, payload] = header.split(' ');

  if (type !== 'Bearer' || typeof payload !== 'string') {
    return next();
  }
  
  const userPayload = await User.tokenVerify(payload);
  if (!userPayload || !isValidObjectId(userPayload.id)) {
    return next();
  }

  const user = await User.findById(userPayload.id);
  if (!user) {
    return next();
  }

  req.currentUser = user;
  next();
};
