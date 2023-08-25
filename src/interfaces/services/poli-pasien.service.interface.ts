import { InquiryPoliPasienDto } from 'src/entities/dtos/poli-pasien/poli-pasien.dto';
import { IPoliPasienSchema } from '../schemas/poli-pasien.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { InquiryPoliDto } from 'src/entities/dtos/poli/poli.dto';
import { InquiryPasienDto } from 'src/entities/dtos/pasien/pasien.dto';

export abstract class IPoliPasienService {
  abstract createPoliPasien(
    create: IPoliPasienSchema,
  ): Promise<[IPoliPasienSchema, ErrorBase]>;
  abstract updatePoliPasienById(
    inquiry: InquiryPoliPasienDto,
    poli_pasien: IPoliPasienSchema,
  ): Promise<[IPoliPasienSchema, ErrorBase]>;
  abstract deletePoliPasienById(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[IPoliPasienSchema, ErrorBase]>;
  abstract deletePoliPasienBy(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[IPoliPasienSchema, ErrorBase]>;
  abstract findById(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[IPoliPasienSchema, ErrorBase]>;
  abstract findByPoliId(
    inquiry: InquiryPoliPasienDto | InquiryPoliPasienDto[],
  ): Promise<[IPoliPasienSchema[], ErrorBase]>;
  abstract findByPasienId(
    inquiry: InquiryPoliPasienDto | InquiryPoliPasienDto[],
  ): Promise<[IPoliPasienSchema[], ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryPoliPasienDto | InquiryPoliPasienDto[],
  ): Promise<[IPoliPasienSchema[], ErrorBase]>;
  abstract findPasienBy(
    inquiry_poli?: InquiryPoliDto,
    inquiry_pasien?: InquiryPasienDto,
  ): Promise<[IPoliPasienSchema[], ErrorBase]>;
  abstract findPasienByNamaPasien(
    inquiry_poli: InquiryPoliPasienDto,
    inquiry_pasien: InquiryPasienDto,
  ): Promise<[IPoliPasienSchema, ErrorBase]>;
  abstract checkInquiryExist<T extends InquiryPoliPasienDto>(
    inquiry: T,
    column: (keyof T)[],
  ): Promise<[T, ErrorBase]>;
}
