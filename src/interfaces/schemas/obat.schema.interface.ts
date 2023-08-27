import { EntityBase } from 'src/internal/pkg/schema.base';
import { IPoliSchema } from './poli.schema.interface';

export class IObatSchema extends EntityBase<IObatSchema> {
  id?: any;
  nama_obat: string;
  harga: number;
  stok: number;

  poli?: IPoliSchema[];
}
