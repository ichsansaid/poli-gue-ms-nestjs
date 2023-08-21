import { EntityBase } from 'src/internal/pkgs/schema.base';

export abstract class IUserSchema extends EntityBase {
  id: any;
  nama_lengkap: string;
  username: string;
  password: string;
}
