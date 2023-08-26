import { InquiryPoliTindakanDto } from 'src/entities/dtos/poli-tindakan/poli-tindakan.dto';
import { IPoliTindakanSchema } from '../schemas/poli-tindakan.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { InquiryPoliDto } from 'src/entities/dtos/poli/poli.dto';
import { InquiryTindakanDto } from 'src/entities/dtos/tindakan/tindakan.dto';

export abstract class IPoliTindakanService {
  abstract createPoliTindakan(
    create: IPoliTindakanSchema,
  ): Promise<[IPoliTindakanSchema, ErrorBase]>;
  abstract updatePoliTindakanById(
    inquiry: InquiryPoliTindakanDto,
    poli_tindakan: IPoliTindakanSchema,
  ): Promise<[IPoliTindakanSchema, ErrorBase]>;
  abstract deletePoliTindakanById(
    inquiry: InquiryPoliTindakanDto,
  ): Promise<[IPoliTindakanSchema, ErrorBase]>;
  abstract deletePoliTindakanBy(
    inquiry: InquiryPoliTindakanDto,
  ): Promise<[IPoliTindakanSchema, ErrorBase]>;
  abstract findById(
    inquiry: InquiryPoliTindakanDto,
  ): Promise<[IPoliTindakanSchema, ErrorBase]>;
  abstract findByPoliId(
    inquiry: InquiryPoliTindakanDto | InquiryPoliTindakanDto[],
  ): Promise<[IPoliTindakanSchema[], ErrorBase]>;
  abstract findByTindakanId(
    inquiry: InquiryPoliTindakanDto | InquiryPoliTindakanDto[],
  ): Promise<[IPoliTindakanSchema[], ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryPoliTindakanDto | InquiryPoliTindakanDto[],
  ): Promise<[IPoliTindakanSchema[], ErrorBase]>;
  abstract findTindakanBy(
    inquiry_poli?: InquiryPoliDto,
    inquiry_tindakan?: InquiryTindakanDto,
  ): Promise<[IPoliTindakanSchema[], ErrorBase]>;
  abstract findTindakanByNamaTindakan(
    inquiry_poli: InquiryPoliTindakanDto,
    inquiry_tindakan: InquiryTindakanDto,
  ): Promise<[IPoliTindakanSchema, ErrorBase]>;
  abstract checkInquiryExist<T extends InquiryPoliTindakanDto>(
    inquiry: T,
    column: (keyof T)[],
  ): Promise<[T, ErrorBase]>;
}
