import { ErrorBase } from 'src/internal/pkg/error.base';
import { IAdminSchema } from '../schemas/admin.schema.interface';
import { IApotekerSchema } from '../schemas/apoteker.schema.interface';
import { IDokterSchema } from '../schemas/dokter.schema.interface';
import { IKasirSchema } from '../schemas/kasir.schema.interface';
import { IUserSchema } from '../schemas/user.schema.interface';
import { EnumUserType, InquiryUserDto } from 'src/entities/dtos/user/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IUserService {
  abstract createUser(user: IUserSchema): Promise<[IUserSchema, ErrorBase]>;
  abstract deleteUser(user: IUserSchema): Promise<[IUserSchema, ErrorBase]>;
  abstract saveUser(user: IUserSchema): Promise<[IUserSchema, ErrorBase]>;
  abstract updateUserById(
    id: string,
    user: IUserSchema,
  ): Promise<[IUserSchema, ErrorBase]>;
  abstract hasById(
    inquiry: InquiryUserDto,
  ): Promise<[[boolean, IUserSchema], ErrorBase]>;
  abstract findById(inquiry: InquiryUserDto): Promise<[IUserSchema, ErrorBase]>;
  abstract findByUsername(
    inquiry: InquiryUserDto,
  ): Promise<[IUserSchema, ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryUserDto | InquiryUserDto[],
  ): Promise<[IUserSchema[], ErrorBase]>;
  abstract saveToDokter(user: IUserSchema): Promise<[IDokterSchema, ErrorBase]>;
  abstract saveToApoteker(
    user: IUserSchema,
  ): Promise<[IApotekerSchema, ErrorBase]>;
  abstract saveToKasir(user: IUserSchema): Promise<[IKasirSchema, ErrorBase]>;
  abstract saveToAdmin(user: IUserSchema): Promise<[IAdminSchema, ErrorBase]>;
  abstract getUserRole(
    inquiry: IUserSchema,
  ): Promise<
    [[IDokterSchema, IAdminSchema, IApotekerSchema, IKasirSchema], ErrorBase]
  >;
  abstract isSamePassword(
    user: IUserSchema,
    password: string,
  ): Promise<[boolean, ErrorBase]>;
  abstract findUserTypeByIds(
    user_type: EnumUserType,
    inquiry: InquiryUserDto[],
  ): Promise<
    [
      IDokterSchema[] | IAdminSchema[] | IApotekerSchema[] | IKasirSchema[],
      ErrorBase,
    ]
  >;
}
