import { IKasirSchema } from 'src/interfaces/schemas/kasir.schema.interface';
import { IUserSchema } from 'src/interfaces/schemas/user.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('kasir')
export class KasirSchema implements IKasirSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  user_id: any;

  user: IUserSchema;
}
