import { EntityBase } from 'src/internal/pkg/schema.base';
import { IPoliObatSchema } from './poli-obat.schema.interface';

export class IPoliObatStokInSchema extends EntityBase<IPoliObatStokInSchema> {
  id: any;
  poli_obat_id: any;
  quantity: number;
  timestamp: Date;

  poli_obat?: IPoliObatSchema;
}

export class IPoliObatStokOutSchema extends EntityBase<IPoliObatStokOutSchema> {
  id: any;
  poli_obat_stok_in_id: any;
  quantity: number;
  timestamp: Date;

  poli_obat_stok_in?: IPoliObatStokInSchema;
}
