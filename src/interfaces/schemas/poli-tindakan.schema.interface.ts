import { EntityBase } from 'src/internal/pkg/schema.base';
import { IPasienSchema } from './pasien.schema.interface';
import { ITindakanSchema } from './tindakan.schema.interface';
import { IPoliSchema } from './poli.schema.interface';

export class IPoliTindakanSchema extends EntityBase<IPasienSchema> {
  id?: any;
  poli_id?: any;
  tindakan_id?: any;

  tindakan?: ITindakanSchema;
  poli?: IPoliSchema;
}
