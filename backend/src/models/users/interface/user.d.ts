import { UserType } from 'src/common/enum';
import { IPagination } from 'src/prisma/pagination.interface';

export interface IUserPayload {
  uuid: string;
  type: UserType;
}

export interface IUserPagination extends IPagination {}
export interface IUserUpdatePayload extends Partial<IUserPayload> {}
