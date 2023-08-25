import { InquiryObatDto } from 'src/entities/dtos/obat/obat.dto';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { IObatSchema } from '../schemas/obat.schema.interface';

export abstract class IObatService {
  abstract createObat(create: IObatSchema): Promise<[IObatSchema, ErrorBase]>;
  abstract updateObatById(
    id: InquiryObatDto,
    poli: IObatSchema,
  ): Promise<[IObatSchema, ErrorBase]>;
  abstract deleteObatById(
    inquiry: InquiryObatDto | InquiryObatDto[],
  ): Promise<[IObatSchema, ErrorBase]>;
  abstract findById(inquiry: InquiryObatDto): Promise<[IObatSchema, ErrorBase]>;
  abstract findByNamaObat(
    inquiry: InquiryObatDto,
  ): Promise<[IObatSchema[], ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryObatDto | InquiryObatDto[],
  ): Promise<[IObatSchema[], ErrorBase]>;
}
