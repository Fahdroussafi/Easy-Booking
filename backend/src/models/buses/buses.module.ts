import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';

@Module({
  providers: [BusesService],
  controllers: [BusesController]
})
export class BusesModule {}
