import { Model, Document } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
}

export interface IUserDocument extends Document, IUser {
  //for user methods
  verifyPassword(password: string): boolean;
  tokenGenerate(): string;
}

export interface IUserModel extends Model<IUserDocument> {
  // for statics functions
  build(user: IUser): IUserDocument;
  tokenVerify(token: string): any;
}
