import { IsDate, IsString } from 'class-validator';

export class User {
  @IsString()
  fullname: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  cin: string;

  @IsString()
  address: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
