import { IPoliSchema } from 'src/interfaces/schemas/poli.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('poli')
export class PoliSchema extends IPoliSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  nama_poli: string;
}
