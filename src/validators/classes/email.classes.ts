import {
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { Types } from 'mongoose';
import { IEmail } from '../../models/interfaces/email-model.interface';

export class EmailValidator implements IEmail {
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsEmail()
  from: string;

  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(10)
  subject: string;

  @IsNotEmpty()
  body: string;

  attachments?: string[] | undefined;
}
