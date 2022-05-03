import mongoose from 'mongoose';
import {
  IEmail,
  IEmailDocument,
  IEmailModel,
} from './interfaces/email-model.interface';

const emailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    attachments: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

emailSchema.statics.build = (email: IEmail) => {
  return new Email(email);
};

export const Email = mongoose.model<IEmailDocument, IEmailModel>(
  'Email',
  emailSchema
);
