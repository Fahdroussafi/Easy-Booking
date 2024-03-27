import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BusesService } from './buses.service';
import { FetchBusDto } from './dto/fetch-buses.dto';

@ApiBearerAuth('Autorization')
@ApiTags('buses')
@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Get()
  async findAll(@Query() fetchBusDto: FetchBusDto) {
    try {
      const buses = await this.busesService.findAll(fetchBusDto);
      return buses;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
