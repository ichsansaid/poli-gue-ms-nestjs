import { IPoliPasienObatSchema } from 'src/interfaces/schemas/poli-pasien-obat.schema.interface';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class PoliPasienObatSchema extends IPoliPasienObatSchema {
  @PrimaryGeneratedColumn('uuid')
  id?: any;

  @Column('uuid')
  poli_pasien_id: any;

  @Column('uuid')
  obat_id: any;
}
