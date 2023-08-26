import { IPoliPasienObatSchema } from 'src/interfaces/schemas/poli-pasien-obat.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('poli_pasien_obat')
export class PoliPasienObatSchema extends IPoliPasienObatSchema {
  @PrimaryGeneratedColumn('uuid')
  id?: any;

  @Column('uuid')
  poli_pasien_id: any;

  @Column('uuid')
  obat_id: any;

  @Column('int4')
  quantity: number;
}
