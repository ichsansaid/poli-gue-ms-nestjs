import { IPasienSchema } from 'src/interfaces/schemas/pasien.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pasien')
export class PasienSchema extends IPasienSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  nama_lengkap: string;

  @Column()
  alamat: string;
}
