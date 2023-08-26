import { EntityBase } from 'src/internal/pkg/schema.base';
import { IPasienSchema } from './pasien.schema.interface';
import { IObatSchema } from './obat.schema.interface';
import { IPoliSchema } from './poli.schema.interface';

export class IPoliObatSchema extends EntityBase<IPasienSchema> {
  id?: any;
  poli_id?: any;
  obat_id?: any;

  obat?: IObatSchema;
  poli?: IPoliSchema;
}
