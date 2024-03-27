import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './models/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BusesModule } from './models/buses/buses.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './models/auth/guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    PrismaModule,
    BusesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
