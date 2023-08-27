import { IPoliPasienSchema } from './poli-pasien.schema.interface';
import { IObatSchema } from './obat.schema.interface';

export abstract class IPoliPasienObatSchema {
  id?: any;
  poli_pasien_id: any;
  obat_id: any;
  quantity: number;

  poli_pasien?: IPoliPasienSchema;
  obat?: IObatSchema;
}
