import { InquiryPoliDto } from 'src/entities/dtos/poli/poli.dto';
import { IPoliSchema } from '../schemas/poli.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';

export abstract class IPoliService {
  abstract createPoli(create: IPoliSchema): Promise<[IPoliSchema, ErrorBase]>;
  abstract updatePoliById(
    id: string,
    poli: IPoliSchema,
  ): Promise<[IPoliSchema, ErrorBase]>;
  abstract deletePoliById(
    inquiry: InquiryPoliDto,
  ): Promise<[IPoliSchema, ErrorBase]>;
  abstract findById(inquiry: InquiryPoliDto): Promise<[IPoliSchema, ErrorBase]>;
  abstract findByNamaPoli(
    inquiry: InquiryPoliDto,
  ): Promise<[IPoliSchema, ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryPoliDto,
  ): Promise<[IPoliSchema[], ErrorBase]>;
}
