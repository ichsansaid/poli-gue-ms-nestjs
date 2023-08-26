import { IPoliUserSchema } from 'src/interfaces/schemas/poli-user.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('poli_user')
export class PoliUserSchema extends IPoliUserSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column('uuid')
  poli_id: any;

  @Column('uuid')
  user_id: any;
}
