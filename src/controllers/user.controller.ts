import { Request, Response } from 'express';
import { NotFound } from '../errors/error-not-found';
import { dataResponseFormat } from '../helpers/data-response-format';
import { User } from '../models/user.model';

export const userRegister = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).send(`User with username ${username} already exist`);
  }
  const newUser = User.build({ username, password });
  await newUser.save();

  res.status(201).send(newUser);
};

export const userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send('Invalid credentials');
  }

  const passwordValid = await user.verifyPassword(password);
  if(!passwordValid) {
    return res.status(400).send('Invalid credentials');
  }

  res.send(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  const usersFormattedData = await dataResponseFormat(req, users);
  res.send(usersFormattedData);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).send('Not found');
  }

  return res.send(user);
};
