import mongoose from 'mongoose';
import {
  IUser,
  IUserDocument,
  IUserModel,
} from './interfaces/user-model.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const ROUNDS = Number(process.env.ROUNDS) || 4;
const JWT_SECRET = process.env.JWT_SECRET || 'test-secret-test';

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
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, ROUNDS);
  user.password = hash;
});

userSchema.statics.build = function (user: IUser) {
  return new User(user);
};

userSchema.statics.tokenVerify = async function (token: string) {
  try {
    const payload = await jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return false;
  }
};

userSchema.methods.verifyPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.tokenGenerate = async function () {
  const token = await jwt.sign(
    { id: this.id, username: this.username },
    JWT_SECRET
  );

  return token;
};

export const User = mongoose.model<IUserDocument, IUserModel>(
  'User',
  userSchema
);
