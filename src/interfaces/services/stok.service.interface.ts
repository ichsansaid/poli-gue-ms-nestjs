import { ErrorBase } from 'src/internal/pkg/error.base';
import { IStokSchema } from '../schemas/stok.schema.interface';
import { AddStokIn, AddStokOut } from 'src/entities/dtos/stok/stok.dto';

export abstract class IStokService {
  abstract createStok(stok: IStokSchema): Promise<[IStokSchema, ErrorBase]>;
  abstract addStokIn(stok_in: AddStokIn): Promise<[IStokSchema, ErrorBase]>;
  abstract addStokOut(stok_out: AddStokOut): Promise<[IStokSchema, ErrorBase]>;
}
