import { IObatSchema } from 'src/interfaces/schemas/obat.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('obat')
export class ObatSchema extends IObatSchema {
  @PrimaryGeneratedColumn('uuid')
  id?: any;

  @Column()
  nama_obat: string;

  @Column()
  harga: number;

  @Column({
    nullable: true,
  })
  stok: number;
}
