import { IPoliObatSchema } from 'src/interfaces/schemas/poli-obat.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('poli_obat')
export class PoliObatSchema extends IPoliObatSchema {
  @PrimaryGeneratedColumn('uuid')
  id?: any;

  @Column('uuid')
  poli_id?: any;

  @Column('uuid')
  obat_id?: any;
}
