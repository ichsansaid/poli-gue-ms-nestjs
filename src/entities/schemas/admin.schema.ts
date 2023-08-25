import { IAdminSchema } from 'src/interfaces/schemas/admin.schema.interface';
import { IUserSchema } from 'src/interfaces/schemas/user.schema.interface';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin')
export class AdminSchema extends IAdminSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column('uuid')
  user_id: any;

  user: IUserSchema;
}
