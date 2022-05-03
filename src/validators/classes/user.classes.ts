import { IUser } from '../../models/interfaces/user-model.interface';
import { MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class UserValidation implements IUser {
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(5)
  username: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(5)
  password: string;
}

