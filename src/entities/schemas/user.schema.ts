import { IUserSchema } from 'src/interfaces/schemas/user.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserSchema extends IUserSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  nama_lengkap: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
