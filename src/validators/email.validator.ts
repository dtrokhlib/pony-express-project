import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { EmailValidator } from './classes/email.classes';

export const emailValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = new EmailValidator();
  email.from = req.body.from;
  email.to = req.body.to;
  email.subject = req.body.subject;
  email.body = req.body.body;

  const validationResults = await validate(email);
  if (validationResults.length > 0) {
    const message = validationResults.map((error) =>
      Object.values(error.constraints!) 
    );
    return res.status(400).send({ message });
  }

  next();
};
