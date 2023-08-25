import { PoliPasienStatus } from 'src/entities/dtos/poli-pasien/poli-pasien.dto';
import { IPasienSchema } from './pasien.schema.interface';
import { IPoliSchema } from './poli.schema.interface';
import { IDokterSchema } from './dokter.schema.interface';

export abstract class IPoliPasienSchema {
  id: any;
  pasien_id: any;
  poli_id: any;
  dokter_id: any;
  arrived_at: Date;
  finished_at: Date;
  status: PoliPasienStatus;

  pasien?: IPasienSchema;
  poli?: IPoliSchema;
  dokter?: IDokterSchema;
}
