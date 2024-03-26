import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class TokenDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refreshToken: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  userId: number;
}

export class AuthTokenInformation {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  // @IsNotEmpty()
  // @ApiProperty()
  // userType: string;
}
