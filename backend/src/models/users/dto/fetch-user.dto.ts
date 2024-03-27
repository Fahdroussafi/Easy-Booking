import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/prisma/dto/pagination.dto';
import { IMeta } from 'src/prisma/pagination.interface';
import { User } from '../entities/user.entity';

export class FetchUserDto extends PaginationDto {}

export class PalettePaginatedResponse {
  @ApiProperty({ isArray: true, description: 'response items' })
  items: Array<User>;
  @ApiProperty({ description: 'Pagination information' })
  meta: IMeta;
}
