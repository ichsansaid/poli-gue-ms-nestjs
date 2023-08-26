import { ITindakanSchema } from 'src/interfaces/schemas/tindakan.schema.interface';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class TindakanSchema extends ITindakanSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  nama_tindakan: string;
}
