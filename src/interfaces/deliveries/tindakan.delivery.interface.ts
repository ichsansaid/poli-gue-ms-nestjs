import {
  CreateTindakanDto,
  InquiryTindakanDto,
  UpdateTindakanDto,
} from 'src/entities/dtos/tindakan/tindakan.dto';
import { ITindakanSchema } from '../schemas/tindakan.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { Box } from 'src/internal/pkg/box.base';

export abstract class ITindakanDelivery {
  abstract createTindakan(
    create: CreateTindakanDto,
  ): Promise<[Box<ITindakanSchema>, ErrorBase]>;
  abstract updateTindakan(
    inquiry: InquiryTindakanDto,
    update: UpdateTindakanDto,
  ): Promise<[Box<ITindakanSchema>, ErrorBase]>;
  abstract getAllTindakan(): Promise<[Box<ITindakanSchema[]>, ErrorBase]>;
  abstract deleteTindakan(
    inquiry: InquiryTindakanDto,
  ): Promise<[Box<ITindakanSchema>, ErrorBase]>;
}
