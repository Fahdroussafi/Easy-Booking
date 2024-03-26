import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './startegy/jwt.strategy';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, JwtModule.register({})],
  providers: [AuthService, JwtStrategy, PrismaClient],
  exports: [AuthService],
})
export class AuthModule {}
