import { InquiryDokterDto } from 'src/entities/dtos/dokter/dokter.dto';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { IDokterSchema } from '../schemas/dokter.schema.interface';

export abstract class IDokterService {
  abstract createDokter(
    create: IDokterSchema,
  ): Promise<[IDokterSchema, ErrorBase]>;
  abstract updateDokterById(
    id: InquiryDokterDto,
    poli: IDokterSchema,
  ): Promise<[IDokterSchema, ErrorBase]>;
  abstract deleteDokterById(
    inquiry: InquiryDokterDto | InquiryDokterDto[],
  ): Promise<[IDokterSchema | IDokterSchema[], ErrorBase]>;
  abstract findById(
    inquiry: InquiryDokterDto,
  ): Promise<[IDokterSchema, ErrorBase]>;
  abstract findByNamaDokter(
    inquiry: InquiryDokterDto,
  ): Promise<[IDokterSchema[], ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryDokterDto | InquiryDokterDto[],
  ): Promise<[IDokterSchema[], ErrorBase]>;
}
