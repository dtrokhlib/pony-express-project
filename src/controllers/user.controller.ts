import { Request, Response } from 'express';
import { NotFound } from '../errors/error-not-found';
import { dataResponseFormat } from '../helpers/data-response-format';
import { User } from '../models/user.model';

export const userRegister = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    return res
      .status(400)
      .send({ message: 'User with this username already exist' });
  }
  const newUser = User.build({ username, password });
  await newUser.save();

  const token = await newUser.tokenGenerate();

  res.status(201).send({ user: newUser, token });
};

export const userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }

  const passwordValid = await user.verifyPassword(password);
  if (!passwordValid) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }

  const token = await user.tokenGenerate();

  res.send({ user, token });
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
