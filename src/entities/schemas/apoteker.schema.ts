import { IApotekerSchema } from 'src/interfaces/schemas/apoteker.schema.interface';
import { IUserSchema } from 'src/interfaces/schemas/user.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('apoteker')
export class ApotekerSchema extends IApotekerSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column('uuid')
  user_id: any;

  user: IUserSchema;
}
