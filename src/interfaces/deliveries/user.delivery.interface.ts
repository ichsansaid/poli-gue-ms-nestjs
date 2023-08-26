import {
  CreateUserDto,
  InquiryUserDto,
  UpdateUserDto,
} from 'src/entities/dtos/user/user.dto';
import { IUserSchema } from '../schemas/user.schema.interface';
import { Box } from 'src/internal/pkg/box.base';
import { ErrorBase } from 'src/internal/pkg/error.base';

export abstract class IUserDelivery {
  abstract createUser(
    data: CreateUserDto,
  ): Promise<[Box<IUserSchema>, ErrorBase]>;
  abstract deleteUser(
    inquiry: InquiryUserDto,
  ): Promise<[Box<IUserSchema>, ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryUserDto,
  ): Promise<[Box<IUserSchema[]>, ErrorBase]>;
  abstract updateUser(
    inquiry: InquiryUserDto,
    data: UpdateUserDto,
  ): Promise<[Box<IUserSchema>, ErrorBase]>;
}
