import { Request, Response } from 'express';
import { NotFound } from '../errors/error-not-found';
import { dataResponseFormat } from '../helpers/data-response-format';

import users from '../local-storage/users.json';

export const getUsers = async (req: Request, res: Response) => {
  const usersFormattedData = await dataResponseFormat(req, users);
  res.send(usersFormattedData);
};

export const getUserById = (req: Request, res: Response) => {
  const { id: userId} = req.params;
  const user = users.filter((userItem) => userItem.id === userId);

  if (!user.length) {
    throw new NotFound('User not found');
  }

  return res.send(...user);
};
