import {
  ConflictException,
  ForbiddenException,
  HttpCode,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, SigninDto } from './dto/auth.dto';
import { AuthTokenInformation } from './dto/token.dto';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(createUserDto: SignupDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await argon2.hash(createUserDto.password),
      },
    });
  }

  async signToken(info: AuthTokenInformation, expiresIn?: string) {
    const configuration = await this.prisma.configuration.findUnique({
      where: {
        id: 1,
      },
    });

    const payloadT = {
      email: info.email,
      userId: info.userId,
    };
    const payloadRT = {
      userId: info.userId,
      email: info.email,
    };

    const token = await this.jwt.signAsync(payloadT, {
      expiresIn: expiresIn
        ? expiresIn
        : configuration?.tokenExpireDuration
          ? configuration?.tokenExpireDuration
          : '1d',
      secret: this.config.get('JWT_SECRET'),
    });

    const refreshToken = await this.jwt.signAsync(payloadRT, {
      expiresIn: '7d',
      secret: this.config.get('JWT_SECRET_REF'),
    });

    const ttoken = await this.prisma.token.findUnique({
      where: {
        userId: info.userId,
      },
    });
    try {
      if (ttoken) {
        await this.prisma.token.delete({
          where: {
            userId: info.userId,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
    try {
      await this.prisma.token.create({
        data: {
          token: token,
          refreshToken: refreshToken,
          userId: info.userId,
        },
      });
    } catch (error) {}

    return {
      token: token,
      refreshToken: refreshToken,
      userId: info.userId,
    };
  }

  async generateTokenFromUser(user: any, expiresIn?: string) {
    const token = await this.signToken(
      {
        email: user.email,
        userId: user.id,
      },
      expiresIn,
    );

    return token;
  }

  @HttpCode(200)
  async signIn(dto: SigninDto) {
    // find the user by cnie
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    console.log(user);
    // compare the password
    if (!user) {
      throw new ForbiddenException('Invalid email');
    }
    if (!(await argon2.verify(user.password, dto.password))) {
      throw new ForbiddenException('Invalid password');
    }

    const expiresIn = '1d';
    const tokenObj = await this.generateTokenFromUser(user, expiresIn);

    return { ...tokenObj };
  }
}
