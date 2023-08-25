import { EntityBase } from 'src/internal/pkg/schema.base';

export abstract class IUserSchema extends EntityBase<IUserSchema> {
  id?: any;
  nama_lengkap?: string;
  username?: string;
  password?: string;
}
