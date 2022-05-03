import mongoose from 'mongoose';
import {
  IUser,
  IUserDocument,
  IUserModel,
} from './interfaces/user-model.interface';
import bcrypt from 'bcrypt';

const SALT = process.env.SALT || 'test-salt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, SALT);
  user.password = hash;
});

userSchema.methods.build = function (user: IUser) {
  return new User(user);
};

userSchema.methods.verifyPassword = async function (password: string) {
  return await bcrypt.compare(this.password, SALT);
};

export const User = mongoose.model<IUserDocument, IUserModel>(
  'User',
  userSchema
);
