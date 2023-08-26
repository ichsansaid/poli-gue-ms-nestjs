import { InquiryApotekerDto } from 'src/entities/dtos/apoteker/apoteker.dto';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { IApotekerSchema } from '../schemas/apoteker.schema.interface';

export abstract class IApotekerService {
  abstract createApoteker(
    create: IApotekerSchema,
  ): Promise<[IApotekerSchema, ErrorBase]>;
  abstract updateApotekerById(
    id: InquiryApotekerDto,
    poli: IApotekerSchema,
  ): Promise<[IApotekerSchema, ErrorBase]>;
  abstract deleteApotekerById(
    inquiry: InquiryApotekerDto | InquiryApotekerDto[],
  ): Promise<[IApotekerSchema | IApotekerSchema[], ErrorBase]>;
  abstract findById(
    inquiry: InquiryApotekerDto,
  ): Promise<[IApotekerSchema, ErrorBase]>;
  abstract findByNamaApoteker(
    inquiry: InquiryApotekerDto,
  ): Promise<[IApotekerSchema[], ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryApotekerDto | InquiryApotekerDto[],
  ): Promise<[IApotekerSchema[], ErrorBase]>;
}
