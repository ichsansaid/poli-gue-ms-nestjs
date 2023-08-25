import {
  CreateObatDto,
  InquiryObatDto,
  UpdateObatDto,
} from 'src/entities/dtos/obat/obat.dto';
import { IObatSchema } from '../schemas/obat.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { Box } from 'src/internal/pkg/box.base';

export abstract class IObatDelivery {
  abstract createObat(
    create: CreateObatDto,
  ): Promise<[Box<IObatSchema>, ErrorBase]>;
  abstract updateObat(
    inquiry: InquiryObatDto,
    update: UpdateObatDto,
  ): Promise<[Box<IObatSchema>, ErrorBase]>;
  abstract getAllObat(): Promise<[Box<IObatSchema[]>, ErrorBase]>;
  abstract deleteObat(
    inquiry: InquiryObatDto,
  ): Promise<[Box<IObatSchema>, ErrorBase]>;
}
