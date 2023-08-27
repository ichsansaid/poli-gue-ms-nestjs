import { IStokSchema } from 'src/interfaces/schemas/stok.schema.interface';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { EnumStokStatus } from '../dtos/stok/stok.dto';

export class StokSchema extends IStokSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  quantity: number;

  @Column()
  timestamp: Date;

  @Column()
  status: EnumStokStatus;

  @Column({
    nullable: true,
  })
  keterangan: string;
}
