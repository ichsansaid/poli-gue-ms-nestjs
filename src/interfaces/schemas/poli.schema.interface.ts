import { EntityBase } from 'src/internal/pkg/schema.base';
import { IDokterSchema } from './dokter.schema.interface';
import { IApotekerSchema } from './apoteker.schema.interface';
import { IKasirSchema } from './kasir.schema.interface';
import { IPasienSchema } from './pasien.schema.interface';
import { IObatSchema } from './obat.schema.interface';

export class IPoliSchema extends EntityBase<IPoliSchema> {
  id: any;
  nama_poli: string;

  dokter?: IDokterSchema[];
  apoteker?: IApotekerSchema[];
  kasir?: IKasirSchema[];
  pasien?: IPasienSchema[];
  obat?: IObatSchema[];
}
