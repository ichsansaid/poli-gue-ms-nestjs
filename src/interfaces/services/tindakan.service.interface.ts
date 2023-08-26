import { InquiryTindakanDto } from 'src/entities/dtos/tindakan/tindakan.dto';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { ITindakanSchema } from '../schemas/tindakan.schema.interface';

export abstract class ITindakanService {
  abstract createTindakan(
    create: ITindakanSchema,
  ): Promise<[ITindakanSchema, ErrorBase]>;
  abstract updateTindakanById(
    id: InquiryTindakanDto,
    poli: ITindakanSchema,
  ): Promise<[ITindakanSchema, ErrorBase]>;
  abstract deleteTindakanById(
    inquiry: InquiryTindakanDto | InquiryTindakanDto[],
  ): Promise<[ITindakanSchema | ITindakanSchema[], ErrorBase]>;
  abstract findById(
    inquiry: InquiryTindakanDto,
  ): Promise<[ITindakanSchema, ErrorBase]>;
  abstract findByNamaTindakan(
    inquiry: InquiryTindakanDto,
  ): Promise<[ITindakanSchema[], ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryTindakanDto | InquiryTindakanDto[],
  ): Promise<[ITindakanSchema[], ErrorBase]>;
}
