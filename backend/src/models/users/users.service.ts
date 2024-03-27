import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserPagination } from './interface/user';
import { Prisma } from '@prisma/client';
import { IMeta } from 'src/prisma/pagination.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(pagination: IUserPagination) {
    try {
      const { page, perPage, search, sortBy, sortOrder } = pagination;
      const where: Prisma.UserWhereInput = {};

      const args: Prisma.UserFindManyArgs = {
        orderBy: {
          [sortBy]: sortOrder,
        },
      };

      const paginatedUsers = await this.prisma.paginate({
        page: page ? Number(page) : 1,
        limit: perPage ? Number(perPage) : 10,
        model: this.prisma.user,
        args,
        where,
      });
      const {
        items,
        meta,
      }: {
        items: any[];
        meta: IMeta;
      } = paginatedUsers as {
        items: any[];
        meta: IMeta;
      };

      const users = items.map((users) => {
        return {
          ...users,
        };
      });
      return {
        items: users,
        meta: meta,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
