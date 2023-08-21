import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  nama_lengkap: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
