import { PoliPasienStatus } from 'src/entities/dtos/poli-pasien/poli-pasien.dto';
import { IPasienSchema } from './pasien.schema.interface';
import { IPoliSchema } from './poli.schema.interface';

export abstract class IPoliPasienSchema {
  id: any;
  pasien_id: any;
  poli_id: any;
  arrival_date: Date;
  status: PoliPasienStatus;

  pasien?: IPasienSchema;
  poli?: IPoliSchema;
}
