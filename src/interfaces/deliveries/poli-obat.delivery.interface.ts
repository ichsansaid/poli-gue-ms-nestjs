import {
  CreatePoliObatDto,
  InquiryPoliObatDto,
} from 'src/entities/dtos/poli-obat/poli-obat.dto';
import { Box } from 'src/internal/pkg/box.base';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { IPoliObatSchema } from '../schemas/poli-obat.schema.interface';
import { IObatSchema } from '../schemas/obat.schema.interface';

export abstract class IPoliObatDelivery {
  abstract createNewObat(
    data: CreatePoliObatDto,
  ): Promise<[Box<IPoliObatSchema>, ErrorBase]>;

  abstract deleteObat(
    inquiry: InquiryPoliObatDto,
  ): Promise<[Box<IPoliObatSchema>, ErrorBase]>;

  abstract getAllObat(
    inquiry: InquiryPoliObatDto,
  ): Promise<[Box<IObatSchema[]>, ErrorBase]>;
}
