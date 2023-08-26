import { IPoliTindakanSchema } from 'src/interfaces/schemas/poli-tindakan.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('poli_tindakan')
export class PoliTindakanSchema extends IPoliTindakanSchema {
  @PrimaryGeneratedColumn('uuid')
  id?: any;

  @Column('uuid')
  poli_id?: any;

  @Column('uuid')
  tindakan_id?: any;
}
