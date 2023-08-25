import {
  CreatePoliDto,
  InquiryPoliDto,
  UpdatePoliDto,
} from 'src/entities/dtos/poli/poli.dto';
import { IPoliSchema } from '../schemas/poli.schema.interface';
import { Box } from 'src/internal/pkg/box.base';
import { ErrorBase } from 'src/internal/pkg/error.base';
import {
  InquiryPoliObatDto,
  ObatStokInDto,
  ObatStokOutDto,
} from 'src/entities/dtos/poli-obat/poli-obat.dto';
import { IPoliObatStokInSchema } from '../schemas/poli-obat-stok.schema.interface';

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

export abstract class IPoliStokDelivery {
  abstract createStokInObat(
    inquiry: InquiryPoliObatDto,
    stok: ObatStokInDto,
  ): Promise<[IPoliObatStokInSchema, ErrorBase]>;
  abstract createStokOutObat(inquiry: InquiryPoliObatDto, stok: ObatStokOutDto);
}
