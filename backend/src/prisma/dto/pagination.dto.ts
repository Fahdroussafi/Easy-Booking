import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ required: false, default: 1 })
  @IsString()
  page: number;

  @ApiPropertyOptional({ required: false, default: '' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false, default: 10 })
  @IsString()
  perPage: number;

  @ApiProperty({ required: false, default: 'id' })
  @IsOptional()
  sortBy?: string;

  @ApiProperty({ required: false, default: 'asc', enum: ['asc', 'desc'] })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}
