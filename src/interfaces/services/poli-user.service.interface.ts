import { InquiryPoliUserDto } from 'src/entities/dtos/poli-user/poli-user.dto';
import { IPoliUserSchema } from '../schemas/poli-user.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { InquiryPoliDto } from 'src/entities/dtos/poli/poli.dto';
import { InquiryUserDto } from 'src/entities/dtos/user/user.dto';

export abstract class IPoliUserService {
  abstract createPoliUser(
    create: IPoliUserSchema,
  ): Promise<[IPoliUserSchema, ErrorBase]>;
  abstract updatePoliUserById(
    inquiry: InquiryPoliUserDto,
    poli_user: IPoliUserSchema,
  ): Promise<[IPoliUserSchema, ErrorBase]>;
  abstract deletePoliUserById(
    inquiry: InquiryPoliUserDto,
  ): Promise<[IPoliUserSchema, ErrorBase]>;
  abstract deletePoliUserBy(
    inquiry: InquiryPoliUserDto,
  ): Promise<[IPoliUserSchema, ErrorBase]>;
  abstract findById(
    inquiry: InquiryPoliUserDto,
  ): Promise<[IPoliUserSchema, ErrorBase]>;
  abstract findByPoliId(
    inquiry: InquiryPoliUserDto | InquiryPoliUserDto[],
  ): Promise<[IPoliUserSchema[], ErrorBase]>;
  abstract findByUserId(
    inquiry: InquiryPoliUserDto | InquiryPoliUserDto[],
  ): Promise<[IPoliUserSchema[], ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryPoliUserDto | InquiryPoliUserDto[],
  ): Promise<[IPoliUserSchema[], ErrorBase]>;
  abstract findUserBy(
    inquiry_poli?: InquiryPoliDto,
    inquiry_user?: InquiryUserDto,
  ): Promise<[IPoliUserSchema[], ErrorBase]>;
  abstract checkInquiryExist<T extends InquiryPoliUserDto>(
    inquiry: T,
    column: (keyof T)[],
  ): Promise<[T, ErrorBase]>;
}
