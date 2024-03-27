import { IPagination } from 'src/prisma/pagination.interface';

export interface IBusPayload {
  busNumber: number;
  capacity: number;
  model: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPagination extends IPagination {}
export interface IUserUpdatePayload extends Partial<IBusPayload> {}
