import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

interface PrismaPaginationProps<U> {
  page?: number;
  limit?: number;
  model: any;
  args: U;
  relations?: Array<{
    key: string;
    relation?: string;
    fk?: string;
    type: string;
    enum?: boolean;
  }>;
  where?: any;
}

interface PaginatedResponse {
  items: Array<any>;
  meta: Object;
}

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService | null) {
    super({
      datasources: {
        db: { url: config.get('DATABASE_URL') },
      },
    });
  }

  async paginate<T>({
    page = 1,
    model,
    args,
    limit,
    where,
  }: PrismaPaginationProps<T>): Promise<PaginatedResponse> {
    const skip = (page - 1) * limit;

    try {
      const [items, count] = await Promise.all([
        model.findMany({
          ...args,
          where,
          skip: skip < 0 ? 0 : skip,
          take: limit === 0 ? undefined : limit,
        }),
        model.count({ where: where || {} }),
      ]);
      return {
        items,
        meta: {
          currentPage: page,
          itemCount: items.length,
          itemsPerPage: limit,
          totalItems: count,
          totalPages: Math.ceil(count / limit),
        },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
