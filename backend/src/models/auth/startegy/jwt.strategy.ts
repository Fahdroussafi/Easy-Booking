import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private prisma: PrismaClient,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req, payload, done) {
    const user = await this.getUser(payload);
    if (!user) {
      return done(null, false);
    }
    return user;
  }

  async getUser(payload) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (user) {
      return {
        ...user,
      };
    }
  }
}
