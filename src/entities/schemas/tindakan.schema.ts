import { ITindakanSchema } from 'src/interfaces/schemas/tindakan.schema.interface';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('tindakan')
export class TindakanSchema extends ITindakanSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  nama_tindakan: string;
}
