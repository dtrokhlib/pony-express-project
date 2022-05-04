import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { UserValidation } from './classes/user.classes';

export const userValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = new UserValidation();
  user.username = req.body.username;
  user.password = req.body.password;

  const validationResults = await validate(user);
  if (validationResults.length > 0) {
    const message = validationResults.map((error) =>
      Object.values(error.constraints!)
    );
    return res.status(400).send({ message });
  }

  next();
};
