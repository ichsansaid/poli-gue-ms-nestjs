import { IPoliPasienTindakanSchema } from 'src/interfaces/schemas/poli-pasien-tindakan.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('poli_pasien_tindakan')
export class PoliPasienTindakanSchema extends IPoliPasienTindakanSchema {
  @PrimaryGeneratedColumn('uuid')
  id?: any;

  @Column('uuid')
  poli_pasien_id: any;

  @Column('uuid')
  tindakan_id: any;
}
