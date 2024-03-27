import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BusesService {
  constructor(private prisma: PrismaService) {}

  async findAll(pagination: any) {
    return {
      items: [],
      meta: {
        page: 1,
        perPage: 10,
        totalItems: 0,
        totalPages: 0,
      },
    };
  }
}
