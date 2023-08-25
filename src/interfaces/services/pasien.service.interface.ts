import { InquiryPasienDto } from 'src/entities/dtos/pasien/pasien.dto';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { IPasienSchema } from '../schemas/pasien.schema.interface';

export abstract class IPasienService {
  abstract createPasien(
    create: IPasienSchema,
  ): Promise<[IPasienSchema, ErrorBase]>;
  abstract updatePasienById(
    id: InquiryPasienDto,
    poli: IPasienSchema,
  ): Promise<[IPasienSchema, ErrorBase]>;
  abstract deletePasienById(
    inquiry: InquiryPasienDto | InquiryPasienDto[],
  ): Promise<[IPasienSchema | IPasienSchema[], ErrorBase]>;
  abstract findById(
    inquiry: InquiryPasienDto,
  ): Promise<[IPasienSchema, ErrorBase]>;
  abstract findByNamaPasien(
    inquiry: InquiryPasienDto,
  ): Promise<[IPasienSchema[], ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryPasienDto | InquiryPasienDto[],
  ): Promise<[IPasienSchema[], ErrorBase]>;
}
