import { Model, Document } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
}

export interface IUserDocument extends Document, IUser {}

export interface IUserModel extends Model<IUserDocument> {
  build: (user: IUser) => IUserDocument;
  verifyPassword: (password: string) => boolean;
}
