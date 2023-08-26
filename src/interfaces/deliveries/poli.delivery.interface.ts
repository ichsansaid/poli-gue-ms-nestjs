import {
  CreatePoliDto,
  InquiryPoliDto,
  UpdatePoliDto,
} from 'src/entities/dtos/poli/poli.dto';
import { IPoliSchema } from '../schemas/poli.schema.interface';
import { Box } from 'src/internal/pkg/box.base';
import { ErrorBase } from 'src/internal/pkg/error.base';

export abstract class IPoliDelivery {
  abstract createPoli(
    data: CreatePoliDto,
  ): Promise<[Box<IPoliSchema>, ErrorBase]>;
  abstract deletePoli(
    inquiry: InquiryPoliDto,
  ): Promise<[Box<IPoliSchema>, ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryPoliDto,
  ): Promise<[Box<IPoliSchema[]>, ErrorBase]>;
  abstract updatePoli(
    inquiry: InquiryPoliDto,
    data: UpdatePoliDto,
  ): Promise<[Box<IPoliSchema>, ErrorBase]>;
}
