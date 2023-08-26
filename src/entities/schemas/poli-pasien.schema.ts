import { IPoliPasienSchema } from 'src/interfaces/schemas/poli-pasien.schema.interface';
import { PoliPasienStatus } from '../dtos/poli-pasien/poli-pasien.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('poli_pasien')
export class PoliPasienSchema extends IPoliPasienSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column('uuid')
  pasien_id: any;

  @Column('uuid')
  poli_id: any;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  dokter_id: any;

  @Column('timestamp')
  arrived_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  finished_at: Date;

  @Column()
  status: PoliPasienStatus;
}
