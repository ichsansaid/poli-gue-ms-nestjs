import { IDokterSchema } from 'src/interfaces/schemas/dokter.schema.interface';
import { IUserSchema } from 'src/interfaces/schemas/user.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dokter')
export class DokterSchema extends IDokterSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column('uuid')
  user_id: any;

  user: IUserSchema;
}
