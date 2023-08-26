import { IPoliPasienSchema } from './poli-pasien.schema.interface';
import { ITindakanSchema } from './tindakan.schema.interface';

export abstract class IPoliPasienTindakanSchema {
  id?: any;
  poli_pasien_id: any;
  tindakan_id: any;

  poli_pasien?: IPoliPasienSchema;
  tindakan?: ITindakanSchema;
}
