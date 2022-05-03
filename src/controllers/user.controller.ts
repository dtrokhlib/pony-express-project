import { Request, Response } from 'express';
import { NotFound } from '../errors/error-not-found';
import { dataResponseFormat } from '../helpers/data-response-format';
import { User } from '../models/user.model';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  const usersFormattedData = await dataResponseFormat(req, users);
  res.send(usersFormattedData);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id: userId} = req.params;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).send('Not found');
    // Error handler needs to be implemented since with async function
    // default middleware for error handling cannot catch the error
    // throw new NotFound('Email not found');
  }

  return res.send(user);
};
