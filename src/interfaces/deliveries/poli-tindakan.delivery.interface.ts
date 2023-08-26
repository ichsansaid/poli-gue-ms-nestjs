import {
  CreatePoliTindakanDto,
  InquiryPoliTindakanDto,
} from 'src/entities/dtos/poli-tindakan/poli-tindakan.dto';
import { Box } from 'src/internal/pkg/box.base';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { IPoliTindakanSchema } from '../schemas/poli-tindakan.schema.interface';
import { ITindakanSchema } from '../schemas/tindakan.schema.interface';

export abstract class IPoliTindakanDelivery {
  abstract createNewTindakan(
    data: CreatePoliTindakanDto,
  ): Promise<[Box<IPoliTindakanSchema>, ErrorBase]>;

  abstract deleteTindakan(
    inquiry: InquiryPoliTindakanDto,
  ): Promise<[Box<IPoliTindakanSchema>, ErrorBase]>;

  abstract getAllTindakan(
    inquiry: InquiryPoliTindakanDto,
  ): Promise<[Box<ITindakanSchema[]>, ErrorBase]>;
}
