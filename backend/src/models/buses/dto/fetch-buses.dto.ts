import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/prisma/dto/pagination.dto';
import { IMeta } from 'src/prisma/pagination.interface';
import { Bus } from '../entities/bus.entity';

export class FetchBusDto extends PaginationDto {}

export class BusPaginatedResponse {
  @ApiProperty({ isArray: true, description: 'response items' })
  items: Array<Bus>;
  @ApiProperty({ description: 'Pagination information' })
  meta: IMeta;
}
