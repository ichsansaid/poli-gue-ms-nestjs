import { EntityBase } from 'src/internal/pkgs/schema.base';
import { IUserSchema } from './user.schema.interface';

export abstract class IKasirSchema extends EntityBase {
  id: any;
  user_id: any;
  user: IUserSchema;
}
