import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { FetchUserDto } from './dto/fetch-user.dto';

@ApiBearerAuth('Autorization')
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() fetchUserDto: FetchUserDto) {
    try {
      const users = await this.usersService.findAll(fetchUserDto);
      return users;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
