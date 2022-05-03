import mongoose, { Document, Model } from 'mongoose';

export interface IEmail {
  userId: mongoose.Types.ObjectId;
  from: string;
  to: string;
  subject: string;
  body: string;
  attachments?: string[]
}

export interface IEmailDocument extends Document, IEmail {}

export interface IEmailModel extends Model<IEmailDocument>{
  build: (email: IEmail) => IEmailDocument;
}