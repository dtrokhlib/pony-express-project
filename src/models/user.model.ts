import mongoose from 'mongoose';
import {
  IUser,
  IUserDocument,
  IUserModel,
} from './interfaces/user-model.interface';
import bcrypt from 'bcrypt';

const ROUNDS = Number(process.env.ROUNDS) || 4;

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

userSchema.methods.verifyPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUserDocument, IUserModel>(
  'User',
  userSchema
);
