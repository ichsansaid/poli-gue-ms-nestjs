import { InquiryPoliObatDto } from 'src/entities/dtos/poli-obat/poli-obat.dto';
import { IPoliObatSchema } from '../schemas/poli-obat.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { InquiryPoliDto } from 'src/entities/dtos/poli/poli.dto';
import { InquiryObatDto } from 'src/entities/dtos/obat/obat.dto';

export abstract class IPoliObatService {
  abstract createPoliObat(
    create: IPoliObatSchema,
  ): Promise<[IPoliObatSchema, ErrorBase]>;
  abstract updatePoliObatById(
    inquiry: InquiryPoliObatDto,
    poli_obat: IPoliObatSchema,
  ): Promise<[IPoliObatSchema, ErrorBase]>;
  abstract deletePoliObatById(
    inquiry: InquiryPoliObatDto,
  ): Promise<[IPoliObatSchema, ErrorBase]>;
  abstract findById(
    inquiry: InquiryPoliObatDto,
  ): Promise<[IPoliObatSchema, ErrorBase]>;
  abstract findByPoliId(
    inquiry: InquiryPoliObatDto | InquiryPoliObatDto[],
  ): Promise<[IPoliObatSchema[], ErrorBase]>;
  abstract findByObatId(
    inquiry: InquiryPoliObatDto | InquiryPoliObatDto[],
  ): Promise<[IPoliObatSchema[], ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryPoliObatDto | InquiryPoliObatDto[],
  ): Promise<[IPoliObatSchema[], ErrorBase]>;
  abstract findObatBy(
    inquiry_poli?: InquiryPoliDto,
    inquiry_obat?: InquiryObatDto,
  ): Promise<[IPoliObatSchema[], ErrorBase]>;
  abstract findObatByNamaObat(
    inquiry_poli: InquiryPoliObatDto,
    inquiry_obat: InquiryObatDto,
  ): Promise<[IPoliObatSchema, ErrorBase]>;
  abstract checkInquiryExist<T extends InquiryPoliObatDto>(
    inquiry: T,
    column: (keyof T)[],
  ): Promise<[T, ErrorBase]>;
}
