import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Email } from '../models/email.model';

export const permissionCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw new Error('Not found, Invalid id provided');
    }
    const email = await Email.findOne({
      userId: req.currentUser.id,
      email: req.params.id,
    });

    if (!email) {
      throw new Error('Access Denied');
    }

    next();
  } catch (error) {
    return res.status(403).send(error);
  }
};
