import { IPagination } from 'src/prisma/pagination.interface';

export interface IUserPayload {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  cin: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPagination extends IPagination {}
export interface IUserUpdatePayload extends Partial<IUserPayload> {}
