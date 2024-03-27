import { IsDate, IsNumber, IsString } from 'class-validator';

export class Bus {
  @IsNumber()
  busNumer: number;

  @IsNumber()
  capacity: number;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  model: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
